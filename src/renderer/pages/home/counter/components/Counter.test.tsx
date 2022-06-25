import '@testing-library/jest-dom';

import { configure, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Counter from './Counter';

configure({ testIdAttribute: 'data-test-id' });

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => {
    return {
      t: (str: string) => str,
    };
  },
}));

describe('<Counter />', () => {
  test('should render default Counter', () => {
    const { asFragment } = render(<Counter />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should render with count', async () => {
    await render(<Counter count={10} />);

    expect(screen.getByTestId('count')).toHaveTextContent('10');
  });

  test('should click +1 button', () => {
    const handler = jest.fn();
    render(<Counter onIncrementClick={handler} />);

    fireEvent.click(screen.getByTestId('increment-button-1'));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(1);
  });

  test('should click +10 button', () => {
    const handler = jest.fn();
    render(<Counter onIncrementClick={handler} />);

    fireEvent.click(screen.getByTestId('increment-button-10'));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(10);
  });

  test('should click -1 button', () => {
    const handler = jest.fn();
    render(<Counter onDecrementClick={handler} />);

    fireEvent.click(screen.getByTestId('decrement-button-1'));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(1);
  });

  test('should click -10 button', () => {
    const handler = jest.fn();
    render(<Counter onDecrementClick={handler} />);

    fireEvent.click(screen.getByTestId('decrement-button-10'));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(10);
  });

  test('should click reset button', () => {
    const handler = jest.fn();
    render(<Counter onResetClick={handler} />);

    fireEvent.click(screen.getByTestId('reset-button'));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
