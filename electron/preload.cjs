const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getCounter: () => ipcRenderer.invoke('get-counter')
});
