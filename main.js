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

    // Créer un menu personnalisé
  const { dialog } = require('electron');
const fs = require('fs');

// Exemple pour ton menu
const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Save',
                accelerator: 'CmdOrCtrl+S',
                click: () => {
                    dialog.showSaveDialog(mainWindow, {
                        title: 'Save your file',
                        defaultPath: 'note.txt',
                    }).then(result => {
                        if (!result.canceled) {
                            const filePath = result.filePath;
                            const content = 'Contenu à enregistrer'; // Remplace par ton texte réel

                            fs.writeFile(filePath, content, (err) => {
                                if (err) {
                                    console.error('Erreur lors de l\'enregistrement :', err);
                                } else {
                                    console.log('Fichier enregistré avec succès !');
                                }
                            });
                        }
                    });
                }
            },
            { role: 'quit' }
        ]
    },
];


    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);
