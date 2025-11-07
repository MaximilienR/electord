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

// Bouton open
                },{label:'open',click:()=>{
    dialog.showOpenDialog(mainWindow, {
        title: 'Ouvrir une note',
        properties: ['openFile'],
        filters: [  { name: 'Text Files', extensions: ['txt', '*' ] }
        ],
    }).then(result => {
        if (!result.canceled) {
            const filePath = result.filePaths[0];

            fs.readFile(filePath, 'utf8', (err, content) => {
                if (err) {
                    console.error('Erreur lors de la lecture du fichier :', err);
                } else {
                    mainWindow.webContents.executeJavaScript(`document.getElementById("input").value = '${content}'`);
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
    message: `Développeur : Maximilien Freelance 
Années de création : 2025

Description 

Cette application a été conçue pour permettre la création rapide et intuitive de note. elle offre une interface simple et efficace afin de faciliter la prise de notes au quotidient, tout en restant légère et performante. 

technologie utulisés 

L'application a été devellopée avec les technologies suivantes : 
Html5 : pour la structure et le contenu 
CSss3 : pour le design et le style viseul 
Javascript(ES6) : pour les fonctionnalités et interativité 

Objectif 

L'objectif principal de cette application est de fournir aux utilisateurs un outil pratique pour capturer et organiser leurs idées, tâches et informations importantes de manière rapide et efficace.

Fonctionnalités principales :
- Interface utilisateur simple et intuitive 
- Sauvegarde et ouverture facile des notes 
- Léger et performant pour une utilisation fluide et rapide 
- Possibilité de partager des notes avec d'autres utilisateurs`,
    buttons: ['OK']
  });
}

app.whenReady().then(createWindow);
