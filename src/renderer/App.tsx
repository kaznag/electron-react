import React from 'react';
import './App.scss';
import { TitleBar } from './shared/titleBar';
import Main from './components/Main';
import i18n from 'i18next';
import { Language } from '../common/message';
import './i18n';

type Props = {};

type State = {
  isFocused: boolean;
  isMaximized: boolean;
  language: string;
  supportLanguages: Language[];
  windowTitle: string;
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isFocused: false,
      isMaximized: false,
      language: '',
      supportLanguages: [],
      windowTitle: '',
    };

    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
    this.onMaximizeResizeButtonClick = this.onMaximizeResizeButtonClick.bind(this);
    this.onMinimizeButtonClick = this.onMinimizeButtonClick.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);

    window.api.onWindowFocus((isFocused) => this.onWindowFocus(isFocused));
    window.api.onWindowMaximize((isMaximize) => this.onWindowMaximize(isMaximize));

    window.api.invokeWindowParameterRequest().then((windowParameter) => {
      this.setState({
        isFocused: windowParameter.isFocused,
        isMaximized: windowParameter.isMaximized,
        supportLanguages: windowParameter.supportLanguages,
        windowTitle: windowParameter.title,
      });
      this.changeLanguage(windowParameter.language);
      window.api.sendWindowInitialized();
    });
  }

  render() {
    return (
      <div className="app">
        <TitleBar
          isFocused={this.state.isFocused}
          isMaximized={this.state.isMaximized}
          windowTitle={this.state.windowTitle}
          onCloseButtonClick={this.onCloseButtonClick}
          onMaximizeResizeButtonClick={this.onMaximizeResizeButtonClick}
          onMinimizeButtonClick={this.onMinimizeButtonClick}
        ></TitleBar>
        <div className="contents">
          <Main
            language={this.state.language}
            supportLanguages={this.state.supportLanguages}
            onLanguageChange={this.onLanguageChange}
          />
        </div>
      </div>
    );
  }

  private onCloseButtonClick() {
    window.api.sendWindowCloseRequest();
  }

  private onMaximizeResizeButtonClick(): void {
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

  private onLanguageChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    this.changeLanguage(e.target.value);
  }

  private changeLanguage(language: string): void {
    i18n.changeLanguage(language);
    this.setState({ language: language });
    window.api.sendChangeLanguage(language);
  }
}

export default App;
