class ChannelKey {
  // main to renderer
  static readonly titleBarState = 'titleBarState';

  // renderer to main
  static readonly titleBarStateRequest = 'titleBarStateRequest';
  static readonly windowInitialized = 'windowInitialized';
  static readonly windowCloseRequest = 'windowCloseRequest';
  static readonly windowMaximizeRestoreRequest = 'windowMaximizeRestoreRequest';
  static readonly windowMinimizeRequest = 'windowMinimizeRequest';
  static readonly changeLanguage = 'changeLanguage';

  static readonly windowParameterRequest = 'windowParameterRequest';
}

export { ChannelKey };
