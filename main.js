const { app, BrowserWindow, Menu, dialog } = require('electron');

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
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Save',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        // Exemple : ouvrir une boîte de dialogue pour enregistrer
                        dialog.showSaveDialog(mainWindow, {
                            title: 'Save your file',
                            defaultPath: 'note.txt',
                        }).then(result => {
                            if (!result.canceled) {
                                console.log('Chemin du fichier :', result.filePath);
                                // Ici tu peux écrire le contenu dans le fichier
                            }
                        });
                    }
                },
                { role: 'quit' } // Option pour quitter l'application
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'toggledevtools' },
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'About',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            message: 'Bloc-notes de Max v1.0',
                        });
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);
