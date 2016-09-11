const electron = require('electron');
const app = electron.app;

const getScreenSize = require('./get-screen-size');
const UA = {
  mobileSafari: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B137 Safari/601.1'
};
module.exports = function(mainWindow) {

  return [
    {
      submenu: [
        {
          label: 'Quit', accelerator: 'Command+Q', click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload', accelerator: 'Command+R', click: () => {
            mainWindow.reload();
          }
        },
        {
          label: 'Toggle DevTools', accelerator: 'Alt+Command+I', click: () => {
            mainWindow.toggleDevTools();
          }
        },
        {
          label: 'User Agent',
          submenu: [
            {
              label: 'Default',
              type: 'radio',
              checked: false,
              click: () => {
                let size = getScreenSize();
                mainWindow.webContents.send('change-useragent', Object.assign({
                  userAgent: ''
                }, size));
              }
            },
            {
              label: 'Mobile Safari',
              type: 'radio',
              checked: false,
              click: () => {
                mainWindow.webContents.send('change-useragent', {
                  userAgent: UA.mobileSafari,
                  width: 320,
                  height: 568
                });
              }
            }
          ]
        }
      ]
    },
    {
      label: 'Translucency',
      submenu: [
        {
          label: 'Appearance',
          submenu: [
            {
              label: 'Enabled',
              accelerator: 'Command+T',
              type: 'checkbox',
              checked: false,
              click: (e) => {
                mainWindow.webContents.send('change-enabled', e.checked);
              }
            },
            {
              label: 'Translucency',
              submenu: getTranslucencyMenu(mainWindow)
            }
          ]
        }
      ]
    }
  ];
};

function getTranslucencyMenu(mainWindow) {
  const step = 10;
  let submenu = [];
  for(let i = 0; i < step; i++) {
    let index = i + 1;

    submenu[i] = {
      label: `${index + '0'}%`,
      accelerator: `Command+${index === step ? 0 : index}`,
      type: 'radio',
      checked: index === step,
      click: () => {
        mainWindow.webContents.send('update-opacity', index / step);
      }
    };
  }
  return submenu;
}