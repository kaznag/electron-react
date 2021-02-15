import '@testing-library/jest-dom';

import { configure, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import TitleBar from './TitleBar';

configure({ testIdAttribute: 'data-test-id' });

describe('<TitleBar />', () => {
  test('should render default TitleBar', () => {
    render(<TitleBar />);

    expect(screen.getByTestId('close-button').className).toBe('close-button');
    expect(screen.getByTestId('maximize-button').className).toBe('maximize-button');
    expect(screen.getByTestId('minimize-button').className).toBe('minimize-button');
    expect(screen.getByTestId('window-title').className).toBe('window-title');
  });

  test('should render with restore button', () => {
    render(<TitleBar isMaximized={true} />);

    expect(screen.getByTestId('close-button').className).toBe('close-button');
    expect(screen.getByTestId('maximize-button').className).toBe('resize-button');
    expect(screen.getByTestId('minimize-button').className).toBe('minimize-button');
    expect(screen.getByTestId('window-title').className).toBe('window-title');
  });

  test('should render blur TitleBar', () => {
    render(<TitleBar isFocused={false} />);

    expect(screen.getByTestId('close-button').className).toBe('close-button blur');
    expect(screen.getByTestId('maximize-button').className).toBe('maximize-button blur');
    expect(screen.getByTestId('minimize-button').className).toBe('minimize-button blur');
    expect(screen.getByTestId('window-title').className).toBe('window-title blur');
  });

  test('should render with blur restore button', () => {
    render(<TitleBar isFocused={false} isMaximized={true} />);

    expect(screen.getByTestId('close-button').className).toBe('close-button blur');
    expect(screen.getByTestId('maximize-button').className).toBe('resize-button blur');
    expect(screen.getByTestId('minimize-button').className).toBe('minimize-button blur');
    expect(screen.getByTestId('window-title').className).toBe('window-title blur');
  });

  test('should render title', () => {
    render(<TitleBar>Hello world</TitleBar>);

    expect(screen.getByTestId('window-title')).toHaveTextContent('Hello world');
  });

  test('should click close button', () => {
    const handler = jest.fn();
    render(<TitleBar onCloseButtonClick={handler} />);

    fireEvent.click(screen.getByTestId('close-button'));
    expect(handler).toHaveBeenCalled();
  });

  test('should click maximize button', () => {
    const handler = jest.fn();
    render(<TitleBar onMaximizeResizeButtonClick={handler} />);

    fireEvent.click(screen.getByTestId('maximize-button'));
    expect(handler).toHaveBeenCalled();
  });

  test('should click minimize button', () => {
    const handler = jest.fn();
    render(<TitleBar onMinimizeButtonClick={handler} />);

    fireEvent.click(screen.getByTestId('minimize-button'));
    expect(handler).toHaveBeenCalled();
  });
});
