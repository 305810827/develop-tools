import { createApp } from "vue";
import App from "./App.vue";

const MOUNT_EL_ID = "x-extension-content-scripts";

let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl && __DEV__) {
  document.body.removeChild(mountEl)
}

const container = document.createElement("div");
container.setAttribute("id", MOUNT_EL_ID);

const root = document.createElement('div')
const styleEl = document.createElement('link')
const shadowDOM =
    container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
styleEl.setAttribute('rel', 'stylesheet')
styleEl.setAttribute('href', chrome.runtime.getURL('content-scripts/style.css'))
shadowDOM.appendChild(styleEl)
shadowDOM.appendChild(root)

document.body.appendChild(container)

// el.insertAdjacentHTML(
//     'afterend',
//     '<div id="app">hello</div>',
// );
const vm = createApp(App).mount(root);

chrome.runtime.onMessage.addListener(message => {
  console.log(message, 'toggleVisible')
  // if (message.toggleVisible) {
  //   vm.visible = !vm.visible;
  // }

  if (message.menuAction === "color-picker") {
    let url = './inject-js/color-picker.js'
    injectScriptIfNotExists(url)
    createColorPicker()
    getPixelColor()
  } else if (message.menuAction === "visible-win") {
    let visibility = document.getElementById('x-extension-content-scripts').style.visibility
    console.log(visibility, 'visibility')
    document.getElementById('x-extension-content-scripts').style.visibility = visibility === 'hidden' ? 'visible' : 'hidden'
  }
});

// 判断脚本是否存在
function injectScriptIfNotExists(url) {
  if (document.querySelector(`script[src="${url}"]`)) {
    // 脚本已存在，不再重复注入
    return;
  }

  // 脚本不存在，进行注入
  injectColorPicker(url)
}

// 注入脚本
function injectColorPicker(url) {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL(url);
  document.body.appendChild(script);
}