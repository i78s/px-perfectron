const electron = require('electron');

module.exports = function() {
  return electron.screen.getPrimaryDisplay().size;
}