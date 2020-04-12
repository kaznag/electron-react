import React from 'react';
import { ipcRenderer } from 'electron';

import './App.scss';
import TitleBar from './TitleBar';
import { ChannelKey } from '../../common/channel-key';

type Props = {};
type State = {};

class App extends React.Component<Props, State> {

  private windowTilte: string;

  constructor(props: Props) {
    super(props);

    this.windowTilte = require('electron').remote.app.name;
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
  }

  render() {
    const nodeVer = process.versions.node;
    const chromeVer = process.versions.chrome;
    const electronVer = process.versions.electron;
    return (
      <div className='app'>
        <TitleBar windowTitle={this.windowTilte} onCloseButtonClick={this.onCloseButtonClick}></TitleBar>
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
};

export default App;
