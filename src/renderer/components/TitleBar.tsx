import React from 'react';

import './TitleBar.scss';

type TitleBarProps = {
  isFocused: boolean;
  isMaximized: boolean;
  windowTitle?: string;
  onCloseButtonClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMaximizeRestoreButtonClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMinimizeButtonClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const TitleBar: React.FC<TitleBarProps> = props => {
  return (
    <div className="title-bar">
      <div className="drag-region"></div>
      <div className={'close-button' + (!props.isFocused ? ' blur' : '')} onClick={props.onCloseButtonClick}></div>
      <div className={(props.isMaximized ? 'title-bar button restore' : 'maximize-button') + (!props.isFocused ? ' blur' : '')} onClick={props.onMaximizeRestoreButtonClick}></div>
      <div className="title-bar button minimize" onClick={props.onMinimizeButtonClick}></div>
      <div className={'window-title' + (!props.isFocused ? ' blur' : '')}>{props.windowTitle}</div>
    </div>
  );
};

export default TitleBar;
