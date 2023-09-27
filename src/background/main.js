// 监听插件图标点击事件
chrome.action.onClicked.addListener(async tab => {
  console.log('action, tab',tab.id)
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { toggleVisible: true });
  }
});

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log({ tab });
  return tab;
}

// 监听与background的onMessage事件
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "POPUP_INIT":
      getCurrentTab().then(sendResponse);
      return true;
    default:
      break;
  }
});

function createMenu() {
  // 创建右键菜单
  chrome.contextMenus.create({
    id: "web-tool-menu",
    title: "web-tool",
    contexts: ["page"]
  });
// 二级菜单
  chrome.contextMenus.create({
    id: "color-picker",
    parentId: "web-tool-menu",
    title: "color-picker",
    contexts: ["page"]
  });

// 二级菜单
  chrome.contextMenus.create({
    id: "visible-win",
    parentId: "web-tool-menu",
    title: "visible-win",
    contexts: ["page"]
  });
}
createMenu()


// 监听选中内容
document.onmouseup = function() {
  const selectedText = window.getSelection().toString().trim();
  console.log(selectedText, 'selectedText')
  if (selectedText !== "") {
    // 选中了内容，显示右键菜单
    chrome.contextMenus.removeAll(); // 移除之前的右键菜单
    createMenu()
  }
  // 如果没有选中内容，不需要添加新的右键菜单，保持之前的右键菜单不变
};


// 监听菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "color-picker") {
    // chrome.scripting.executeScript({
    //   target: { tabId: tab.id },
    //   function: injectScriptOption1
    // });
    chrome.tabs.sendMessage(tab.id, {menuAction: info.menuItemId})

  }else if (info.menuItemId === "visible-win") {
    chrome.tabs.sendMessage(tab.id, {menuAction: info.menuItemId})

  }
});
// 热更新
//service_worker接收消息
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.msg == 'RELOAD') {
//     chrome.runtime.reload() //重载Chrome插件
//     sendResponse() //回传消息给content_scripts
//   }
// })
