const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const remote = electron.remote;
const app = remote.app;
const currentWindow = remote.getCurrentWindow();
const getScreenSize = require('./modules/main/get-screen-size');
const WebViewController = require('./modules/renderer/webview-controller');

let webViewController = new WebViewController(document.querySelector('webview'), {
    loadURL: getScreenSize()
});

ipcRenderer.on('reload', (event) => {
    webViewController.reload();
});

ipcRenderer.on('toggle-devtools', (event) => {
    webViewController.toggleDevTools();
});

ipcRenderer.on('change-enabled', (event, arg) => {
    webViewController.updateEnabled(arg);
});

ipcRenderer.on('change-useragent', (event, arg) => {
    let url = getInputValue();
    webViewController.loadURL(url, arg);
    currentWindow.setSize(arg.width, arg.height, true);
});

ipcRenderer.on('update-opacity', (event, arg) => {
    webViewController.updateOpacity(arg);
});

const $form = document.forms[0];
const $input = $form.querySelector('input');

$form.addEventListener('submit', (e) => {
    e.preventDefault();

    let url = getInputValue();
    webViewController.loadURL(url);
});

function getInputValue() {
    return $input.value;
}