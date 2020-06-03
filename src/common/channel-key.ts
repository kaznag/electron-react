
class ChannelKey {
  // main to renderer
  static readonly windowMaximize = 'windowMaximize';

  // renderer to main
  static readonly windowCloseRequest = 'windowCloseRequest';
  static readonly windowMaximizeRestoreRequest = 'windowMaximizeRestoreRequest';
  static readonly windowMinimizeRequest = 'windowMinimizeRequest';
}

export {
  ChannelKey,
}
