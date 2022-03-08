import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { ChannelKey } from '../common/channel-key';
import { TitleBarState, WindowParameter } from '../common/message';

contextBridge.exposeInMainWorld('api', {
  addTitleBarStateListener: (listnener: (state: TitleBarState) => void) => {
    ipcRenderer.on(ChannelKey.titleBarState, (_event: IpcRendererEvent, state: TitleBarState) => {
      listnener(state);
    });
  },
  removeTitleBarStateListner: () => {
    ipcRenderer.removeAllListeners(ChannelKey.titleBarState);
  },
  invokeTitleBarStateRequest: async (): Promise<TitleBarState> => {
    return await ipcRenderer.invoke(ChannelKey.titleBarStateRequest);
  },
  sendWindowInitialized: () => {
    ipcRenderer.send(ChannelKey.windowInitialized);
  },
  sendWindowCloseRequest: () => {
    ipcRenderer.send(ChannelKey.windowCloseRequest);
  },
  sendWindowMaximizeRestoreRequest: () => {
    ipcRenderer.send(ChannelKey.windowMaximizeRestoreRequest);
  },
  sendWindowMinimizeRequest: () => {
    ipcRenderer.send(ChannelKey.windowMinimizeRequest);
  },
  sendChangeLanguage: (language: string) => {
    ipcRenderer.send(ChannelKey.changeLanguage, language);
  },
  invokeWindowParameterRequest: async (): Promise<WindowParameter> => {
    return await ipcRenderer.invoke(ChannelKey.windowParameterRequest);
  },
  invoke: async (channel: string, ...args: any[]): Promise<any> => {
    return await ipcRenderer.invoke(channel, args);
  },
  on: (channel: string, listener: (...args: any[]) => void) => {
    ipcRenderer.on(channel, (_event: IpcRendererEvent, ...args: any[]) => {
      if (args.length === 1) {
        listener(args[0]);
      } else {
        listener(args);
      }
    });
  },
  send: (channel: string, ...args: any[]) => {
    ipcRenderer.send(channel, args);
  },
});
