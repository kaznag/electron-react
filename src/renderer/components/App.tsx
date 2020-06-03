import React from 'react';
import { ipcRenderer, IpcRendererEvent } from 'electron';

import './App.scss';
import TitleBar from './TitleBar';
import { ChannelKey } from '../../common/channel-key';

type Props = {};

type State = {
  isMaximized: boolean;
};

class App extends React.Component<Props, State> {

  private windowTilte: string;

  constructor(props: Props) {
    super(props);

    this.state = {
      isMaximized: require('electron').remote.getCurrentWindow().isMaximized()
    };

    this.windowTilte = require('electron').remote.app.name;
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
    this.onMaximizeRestoreButtonClick = this.onMaximizeRestoreButtonClick.bind(this);
    this.onMinimizeButtonClick = this.onMinimizeButtonClick.bind(this);

    ipcRenderer.on(ChannelKey.windowMaximize,
      (_event: IpcRendererEvent, isMaximized: boolean) => this.onWindowMaximize(isMaximized));
  }

  render() {
    const nodeVer = process.versions.node;
    const chromeVer = process.versions.chrome;
    const electronVer = process.versions.electron;
    return (
      <div className='app'>
        <TitleBar isMaximized={this.state.isMaximized}
          windowTitle={this.windowTilte}
          onCloseButtonClick={this.onCloseButtonClick}
          onMaximizeRestoreButtonClick={this.onMaximizeRestoreButtonClick}
          onMinimizeButtonClick={this.onMinimizeButtonClick}></TitleBar>
        <div className="contents">
          We are using node {nodeVer},
          Chrome {chromeVer},
          and Electron {electronVer}.
        </div>
      </div>
    );
  }

  private onCloseButtonClick() {
    ipcRenderer.send(ChannelKey.windowCloseRequest);
  }

  private onMaximizeRestoreButtonClick(): void {
    ipcRenderer.send(ChannelKey.windowMaximizeRestoreRequest);
  }

  private onMinimizeButtonClick(): void {
    ipcRenderer.send(ChannelKey.windowMinimizeRequest);
  }

  private onWindowMaximize(isMaximized: boolean): void {
    this.setState({ isMaximized: isMaximized });
  }
};

export default App;
