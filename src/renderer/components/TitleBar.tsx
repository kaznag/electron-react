import React from 'react';

import './TitleBar.scss';

type TitleBarProps = {
  isMaximized: boolean;
  windowTitle?: string;
  onCloseButtonClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMaximizeRestoreButtonClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMinimizeButtonClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const TitleBar: React.FC<TitleBarProps> = props => {
  const button = props.isMaximized ?
    <div className="title-bar button restore" onClick={props.onMaximizeRestoreButtonClick}></div> :
    <div className="title-bar button maximize" onClick={props.onMaximizeRestoreButtonClick}></div>;

  return (
    <div className="title-bar">
      <div className="title-bar drag-region"></div>
      <div className="title-bar button close" onClick={props.onCloseButtonClick}></div>
      {button}
      <div className="title-bar button minimize" onClick={props.onMinimizeButtonClick}></div>
      <div className="title-bar window-title">{props.windowTitle}</div>
    </div>
  );
};

export default TitleBar;
