import React from 'react';

import './TitleBar.scss';

type TitleBarProps = {
  isFocused?: boolean;
  isMaximized?: boolean;
  windowTitle?: string;
  onCloseButtonClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMaximizeResizeButtonClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMinimizeButtonClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const defaultValue: TitleBarProps = {
  isFocused: true,
  isMaximized: false,
};

function TitleBar(props: TitleBarProps) {
  const isFocused = props.isFocused ?? defaultValue.isFocused;
  const isMaximized = props.isMaximized ?? defaultValue.isMaximized;

  return (
    <div className="title-bar">
      <div className="drag-region"></div>
      <div
        className={'close-button' + (!isFocused ? ' blur' : '')}
        onClick={props.onCloseButtonClick}
        data-test-id="close-button"
      ></div>
      <div
        className={
          (isMaximized ? 'resize-button' : 'maximize-button') + (!isFocused ? ' blur' : '')
        }
        onClick={props.onMaximizeResizeButtonClick}
        data-test-id="maximize-button"
      ></div>
      <div
        className={'minimize-button' + (!isFocused ? ' blur' : '')}
        onClick={props.onMinimizeButtonClick}
        data-test-id="minimize-button"
      ></div>
      <div className={'window-title' + (!isFocused ? ' blur' : '')} data-test-id="window-title">
        {props.windowTitle}
      </div>
    </div>
  );
}

export default TitleBar;
