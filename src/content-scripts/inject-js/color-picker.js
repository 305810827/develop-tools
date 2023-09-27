// 创建取色器 UI
function createColorPicker() {
    const picker = document.createElement('div');
    picker.style.position = 'fixed';
    picker.style.top = '0';
    picker.style.left = '0';
    picker.style.width = '100%';
    picker.style.height = '100%';
    picker.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    document.body.appendChild(picker);
    // 监听鼠标点击事件
    picker.addEventListener('click', (event) => {
        // 获取鼠标点击位置的像素颜色
        const color = getPixelColor(event.clientX, event.clientY);

        // 将颜色值传递给插件
        chrome.runtime.sendMessage({ color: color });

        // 关闭取色器 UI
        document.body.removeChild(picker);
    });
}

// 获取页面像素颜色
function getPixelColor(x, y) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const context = canvas.getContext('2d');
    context.drawImage(document.documentElement, -x, -y, 1, 1, 0, 0, 1, 1);
    const pixelData = context.getImageData(0, 0, 1, 1).data;
    return `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
}
// 启动取色器
// createColorPicker();