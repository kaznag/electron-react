import { app, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { MainWindow } from './main-window';
import { ApplicationSettings } from './application-settings';
import { ChannelKey } from '../common/channel-key';
import { WindowParameter } from '../common/message';

class Application {
  private readonly isDev = process.env.NODE_ENV !== 'production';

  private mainWindow: MainWindow | null = null;

  private appSettings: ApplicationSettings | null = null;
  private language: string = '';
  private supportLanguages = [
    {
      language: 'en',
      label: 'English',
    },
    {
      language: 'ja',
      label: '日本語',
    },
  ];

  constructor(public app: Electron.App) {
    if (!this.app.requestSingleInstanceLock()) {
      this.app.quit();
    }

    this.appSettings = new ApplicationSettings();

    this.app.on('ready', () => this.onReady());
    this.app.on('window-all-closed', () => this.onWindowAllClosed());
    this.app.on('second-instance', () => this.onSecondInstance());

    ipcMain.on(ChannelKey.windowCloseRequest, () => this.onIpcWindowCloseRequest());
    ipcMain.on(ChannelKey.windowMaximizeRestoreRequest, () =>
      this.onIpcWindowMaximizeRestoreRequest()
    );
    ipcMain.on(ChannelKey.windowMinimizeRequest, () => this.onIpcWindowMinimizeRequest());
    ipcMain.on(ChannelKey.changeLanguage, (_event: Event, language: string) =>
      this.onIpcChangeLanguage(language)
    );
    ipcMain.once(ChannelKey.windowInitialized, () => this.onIpcWindowInitialized());
    ipcMain.handle(ChannelKey.windowParameterRequest, () => this.onWindowParameterRequest());
  }

  private onReady(): void {
    if (this.appSettings) {
      this.language = this.appSettings.getLanguage();
      if (!this.language) {
        this.language = this.extractLanguage(app.getLocale());
      }
    }

    this.initializeLanguage().then(() => {
      this.mainWindow = new MainWindow(this.appSettings!);

      this.mainWindow.on('blur', () => this.onWindowBlur());
      this.mainWindow.on('focus', () => this.onWindowFocus());
      this.mainWindow.on('maximize', () => this.onWindowMaximize());
      this.mainWindow.on('unmaximize', () => this.onWindowUnmaximize());
    });

    if (this.isDev) {
      import('electron-devtools-installer').then((installer) => {
        installer
          .default([installer['REACT_DEVELOPER_TOOLS'], installer['REDUX_DEVTOOLS']], {
            loadExtensionOptions: {
              allowFileAccess: true,
            },
            forceDownload: !!process.env.UPGRADE_EXTENSIONS,
          })
          .catch((error) => console.error('An error occurred: ', error));
      });
    }
  }

  private onWindowAllClosed(): void {
    if (process.platform != 'darwin') {
      this.app.quit();
    }
  }

  private onSecondInstance(): void {
    if (this.mainWindow) {
      this.mainWindow.show();
    }
  }

  private onWindowBlur(): void {
    this.sendWindowFocus(false);
  }

  private onWindowFocus(): void {
    this.sendWindowFocus(true);
  }

  private onWindowMaximize(): void {
    this.sendWindowMaximize(true);
  }

  private onWindowUnmaximize(): void {
    this.sendWindowMaximize(false);
  }

  private onIpcWindowCloseRequest(): void {
    this.mainWindow!.close();
  }

  private onIpcWindowMaximizeRestoreRequest(): void {
    this.mainWindow!.maximizeRestore();
  }

  private onIpcWindowMinimizeRequest(): void {
    this.mainWindow!.minimize();
  }

  private onIpcChangeLanguage(language: string): void {
    this.appSettings?.setLanguage(language);
  }

  private onIpcWindowInitialized(): void {
    if (this.appSettings!.getWindowIsMaximized()) {
      this.mainWindow!.maximize();
    } else {
      this.mainWindow!.show();
    }
  }

  private onWindowParameterRequest(): WindowParameter {
    return {
      isFocused: this.mainWindow!.isFocused(),
      isMaximized: this.mainWindow!.isMaximized(),
      language: this.language,
      supportLanguages: this.supportLanguages,
      title: this.app.name,
    };
  }

  private sendWindowFocus(isFocused: boolean): void {
    this.mainWindow!.send(ChannelKey.windowFocus, isFocused);
  }

  private sendWindowMaximize(isMaximized: boolean): void {
    this.mainWindow!.send(ChannelKey.windowMaximize, isMaximized);
  }

  private extractLanguage(locale: string): string {
    const separator = '-';
    if (locale.toLowerCase().includes(separator)) {
      return locale.split(separator, 1)[0];
    }

    return locale;
  }

  private async initializeLanguage(): Promise<void> {
    const dir = path.resolve(this.app.getAppPath(), 'locales');

    try {
      const files = await fs.promises.readdir(dir);
      const lang = files
        .filter((o) => o.includes('.json') && !o.includes('locales.json'))
        .map((o) => path.basename(o, path.extname(o)));
      this.supportLanguages = this.supportLanguages.filter((o) => lang.includes(o.language));

      if (!this.supportLanguages.find((o) => o.language === this.language)) {
        this.language = this.supportLanguages[0].language;
      }
    } catch (err) {}
  }
}

new Application(app);
