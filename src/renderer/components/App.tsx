import React from 'react';
// import { ipcRenderer, IpcRendererEvent } from 'electron';

import './App.scss';
import TitleBar from './TitleBar';
// import { ChannelKey } from '../../common/channel-key';

type Props = {};

type State = {
  isMaximized: boolean;
  windowTitle: string;
};

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      isMaximized: false,
      windowTitle: '',
    };

    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
    this.onMaximizeRestoreButtonClick = this.onMaximizeRestoreButtonClick.bind(this);
    this.onMinimizeButtonClick = this.onMinimizeButtonClick.bind(this);

    window.api.onWindowMaximize(isMaximize => this.onWindowMaximize(isMaximize));

    window.api.invokeWindowParameterRequest()
      .then(windowParameter => {
        this.setState({
          isMaximized: windowParameter.isMaximized,
          windowTitle: windowParameter.title,
        });
        window.api.sendWindowInitialized();
      });
  }

  render() {
    return (
      <div className='app'>
        <TitleBar isMaximized={this.state.isMaximized}
          windowTitle={this.state.windowTitle}
          onCloseButtonClick={this.onCloseButtonClick}
          onMaximizeRestoreButtonClick={this.onMaximizeRestoreButtonClick}
          onMinimizeButtonClick={this.onMinimizeButtonClick}></TitleBar>
        <div className="contents">
          Hello world
        </div>
      </div>
    );
  }

  private onCloseButtonClick() {
    window.api.sendWindowCloseRequest();
  }

  private onMaximizeRestoreButtonClick(): void {
    window.api.sendWindowMaximizeRestoreRequest();
  }

  private onMinimizeButtonClick(): void {
    window.api.sendWindowMinimizeRequest();
  }

  private onWindowMaximize(isMaximized: boolean): void {
    this.setState({ isMaximized: isMaximized });
  }
};

export default App;
