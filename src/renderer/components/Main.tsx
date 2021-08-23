import React from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '../../common/message';
import CounterContainer from '../containers/CounterContainer';

type MainProps = {
  language: string;
  supportLanguages: Language[];
  onLanguageChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Main: React.FC<MainProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div>
      Hello world
      <h2>{t('counter')}</h2>
      <CounterContainer></CounterContainer>
      <h2>{t('language')}</h2>
      <select value={props.language} onChange={props.onLanguageChange}>
        {props.supportLanguages.map((o) => (
          <option key={o.language} value={o.language}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Main;
