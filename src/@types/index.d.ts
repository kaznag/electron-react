import { TitleBarState, WindowParameter } from '../common/message';

declare global {
  interface Window {
    api: Api;
  }
}

export interface Api {
  addTitleBarStateListener: (listnener: (state: TitleBarState) => void) => void;
  removeTitleBarStateListner: () => void;
  invokeTitleBarStateRequest: () => Promise<TitleBarState>;
  sendWindowInitialized: () => void;
  sendWindowCloseRequest: () => void;
  sendWindowMaximizeRestoreRequest: () => void;
  sendWindowMinimizeRequest: () => void;
  sendChangeLanguage: (language: string) => void;
  invokeWindowParameterRequest: () => Promise<WindowParameter>;
  invoke: (channel: string, ...args: any[]) => Promise<any>;
  on: (channel: string, listener: (...args: any[]) => void) => void;
  send: (channel: string, ...args: any[]) => void;
}
