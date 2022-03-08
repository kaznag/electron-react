import React from 'react';
import './App.scss';
import { TitleBarContainer } from './shared/titleBar';
import Main from './components/Main';
import i18n from 'i18next';
import { Language } from '../common/message';
import './i18n';

type Props = {};

type State = {
  language: string;
  supportLanguages: Language[];
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      language: '',
      supportLanguages: [],
    };

    this.onLanguageChange = this.onLanguageChange.bind(this);

    window.api.invokeWindowParameterRequest().then((windowParameter) => {
      this.setState({
        supportLanguages: windowParameter.supportLanguages,
      });
      this.changeLanguage(windowParameter.language);
      window.api.sendWindowInitialized();
    });
  }

  render() {
    return (
      <div className="app">
        <TitleBarContainer />
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
