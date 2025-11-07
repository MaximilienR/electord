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

// menu
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
    {
        label: 'Help',
        submenu: [
            { label: 'doc' , click: () => { doc(); } },
            
        ]
    }
];


    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

//
function doc() {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Documentation',
    message: `Documentation de l’application

Développeur : Maximilien Freelance
Année de création : 2025

Description

Cette application a été conçue pour permettre la création rapide et intuitive de notes. Elle offre une interface simple et efficace afin de faciliter la prise de notes au quotidien, tout en restant légère et performante.

Technologies utilisées

L’application a été développée avec les technologies suivantes :

HTML5 : pour la structure et le contenu.
CSS3 : pour le design et le style visuel.
JavaScript (ES6) : pour les fonctionnalités et l’interactivité.
Electron.js : pour créer une application desktop multiplateforme.

Objectif

L’objectif principal de cette application est de fournir aux utilisateurs un outil rapide, fiable et facile à utiliser pour la gestion de leurs notes, que ce soit pour un usage personnel ou professionnel.`,
    buttons: ['OK']
  });
}
;


app.whenReady().then(createWindow);
