import '@testing-library/jest-dom';

import { configure, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { TitleBar } from './TitleBar';

configure({ testIdAttribute: 'data-test-id' });

describe('<TitleBar />', () => {
  test('should render default TitleBar', () => {
    const { asFragment } = render(<TitleBar />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should render with resize button', () => {
    const { asFragment } = render(<TitleBar isMaximized={true} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should render blur TitleBar', () => {
    const { asFragment } = render(<TitleBar isFocused={false} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should render with blur resize button', () => {
    const { asFragment } = render(<TitleBar isFocused={false} isMaximized={true} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should render title', () => {
    const { asFragment } = render(<TitleBar windowTitle={'Hello world'} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should click close button', () => {
    const handler = jest.fn();
    const { queryByTestId, getByTestId } = render(<TitleBar onCloseButtonClick={handler} />);

    expect(queryByTestId('close-button')).toBeTruthy();

    fireEvent.click(getByTestId('close-button'));
    expect(handler).toHaveBeenCalled();
  });

  test('should click maximize button', () => {
    const handler = jest.fn();
    const { queryByTestId, getByTestId } = render(
      <TitleBar onMaximizeResizeButtonClick={handler} />
    );

    expect(queryByTestId('maximize-button')).toBeTruthy();

    fireEvent.click(getByTestId('maximize-button'));
    expect(handler).toHaveBeenCalled();
  });

  test('should click minimize button', () => {
    const handler = jest.fn();
    const { queryByTestId, getByTestId } = render(<TitleBar onMinimizeButtonClick={handler} />);

    expect(queryByTestId('minimize-button')).toBeTruthy();

    fireEvent.click(getByTestId('minimize-button'));
    expect(handler).toHaveBeenCalled();
  });
});
