const { app, BrowserWindow, Menu, dialog } = require('electron');
const fs = require('fs');
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('index.html');

    // Menu personnalisé
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Save',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
    dialog.showSaveDialog(mainWindow, {
        title: 'Enregistrer la note',
        defaultPath: 'note.txt',
    }).then(result => {
        if (!result.canceled) {
            const filePath = result.filePath;

            mainWindow.webContents.executeJavaScript('document.getElementById("input").value')
            .then(content => {
                fs.writeFile(filePath, content, (err) => {
                    if (err) {
                        console.error('Erreur lors de l\'enregistrement :', err);
                    } else {
                        console.log('Fichier enregistré avec succès ! ✅');
                    }
                });
            });
        }
    });
}
                },
                { role: 'quit' }
            ]
        },
        {
            label: 'Help',
            submenu: [
                { label: 'doc', click: () => { doc(); } },
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// Fonction documentation
function doc() {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Documentation',
    message: `Documentation de l’application

Développeur : Maximilien Freelance
Année : 2025

Cette application permet de prendre et sauvegarder des notes rapidement.
Technos : HTML, CSS, JS, Electron.`,
    buttons: ['OK']
  });
}

app.whenReady().then(createWindow);
