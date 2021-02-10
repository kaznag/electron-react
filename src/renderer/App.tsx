import React from 'react';
import './App.scss';
import TitleBar from './components/TitleBar';

type Props = {};

type State = {
  isFocused: boolean;
  isMaximized: boolean;
  windowTitle: string;
};

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      isFocused: false,
      isMaximized: false,
      windowTitle: '',
    };

    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
    this.onMaximizeRestoreButtonClick = this.onMaximizeRestoreButtonClick.bind(this);
    this.onMinimizeButtonClick = this.onMinimizeButtonClick.bind(this);

    window.api.onWindowFocus(isFocused => this.onWindowFocus(isFocused));
    window.api.onWindowMaximize(isMaximize => this.onWindowMaximize(isMaximize));

    window.api.invokeWindowParameterRequest()
      .then(windowParameter => {
        this.setState({
          isFocused: windowParameter.isFocused,
          isMaximized: windowParameter.isMaximized,
          windowTitle: windowParameter.title,
        });
        window.api.sendWindowInitialized();
      });
  }

  render() {
    return (
      <div className='app'>
        <TitleBar isFocused={this.state.isFocused}
          isMaximized={this.state.isMaximized}
          onCloseButtonClick={this.onCloseButtonClick}
          onMaximizeRestoreButtonClick={this.onMaximizeRestoreButtonClick}
          onMinimizeButtonClick={this.onMinimizeButtonClick}>{this.state.windowTitle}</TitleBar>
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

  private onWindowFocus(isFocused: boolean): void {
    this.setState({ isFocused: isFocused });
  }

  private onWindowMaximize(isMaximized: boolean): void {
    this.setState({ isMaximized: isMaximized });
  }
};

export default App;
