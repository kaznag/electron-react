import React from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '../../common/message';
import { CounterContainer } from '../pages/home/counter';

type Props = {
  language: string;
  supportLanguages: Language[];
  onLanguageChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Home: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <div>
      <CounterContainer />
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

export { Home };
