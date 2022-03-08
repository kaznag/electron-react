import React, { useCallback, useEffect, useState } from 'react';
import { TitleBarState } from '../../../common/message';
import { TitleBar } from './TitleBar';

function TitleBarContainer(): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [title, setTitle] = useState('');
  const onCloseButtonClick = useCallback(() => window.api.sendWindowCloseRequest(), []);
  const onMaximizeResizeButtonClick = useCallback(
    () => window.api.sendWindowMaximizeRestoreRequest(),
    []
  );
  const onMinimizeButtonClick = useCallback(() => window.api.sendWindowMinimizeRequest(), []);

  function updateState(state: TitleBarState): void {
    if (state.isFocused !== undefined) {
      setIsFocused(state.isFocused);
    }
    if (state.isMaximized !== undefined) {
      setIsMaximized(state.isMaximized);
    }
    if (state.title !== undefined) {
      setTitle(state.title);
    }
  }

  useEffect(() => {
    window.api.invokeTitleBarStateRequest().then((state) => updateState(state));
    window.api.addTitleBarStateListener((state) => updateState(state));

    return () => {
      window.api.removeTitleBarStateListner();
    };
  });

  return (
    <TitleBar
      isFocused={isFocused}
      isMaximized={isMaximized}
      windowTitle={title}
      onCloseButtonClick={onCloseButtonClick}
      onMaximizeResizeButtonClick={onMaximizeResizeButtonClick}
      onMinimizeButtonClick={onMinimizeButtonClick}
    />
  );
}

export { TitleBarContainer };
