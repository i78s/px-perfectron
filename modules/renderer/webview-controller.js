class WebViewController {

  constructor(element, options) {
    this.element = element;
    this.url = '';
    this.isEnabled = false;
    this._opacity = 1;

    this.options = Object.assign({
      loadURL: {
        width: 320,
        height: 568
      }
    }, options);
  }

  set opacity(val) {
    this._opacity = val;
  }

  get opacity() {
    return this.isEnabled ? this._opacity : 1;
  }

  updateEnabled(enabled) {
    this.isEnabled = enabled;
    this.updateOpacity();
  }

  updateOpacity(value) {
    if (value) {
      this.opacity = value;
    }
    this.element.style.opacity = this.opacity;
  }

  loadURL(url, arg) {
    if (arg) {
      this.options.loadURL = arg;
    }
    this.element.loadURL(url, this.options.loadURL);
  }

  reload() {
    this.element.reloadIgnoringCache();
  }

  toggleDevTools() {
    if (this.element.isDevToolsOpened()) {
      this.element.closeDevTools();
      return;
    }
    this.element.openDevTools();
  }
}

module.exports = WebViewController;