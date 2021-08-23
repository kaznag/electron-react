import React from 'react';

import './Counter.scss';

type CounterProps = {
  count?: number;
  onIncrementClick?: (count: number) => void;
  onDecrementClick?: (count: number) => void;
  onResetClick?: () => void;
};

const defaultValue: CounterProps = {
  count: 0,
};

const Counter: React.FC<CounterProps> = (props) => {
  const count = props.count ?? defaultValue.count;
  return (
    <div>
      <button
        onClick={() => {
          if (props.onDecrementClick) {
            props.onDecrementClick(10);
          }
        }}
        data-test-id="decrement-button-10"
      >
        -10
      </button>
      <button
        onClick={() => {
          if (props.onDecrementClick) {
            props.onDecrementClick(1);
          }
        }}
        data-test-id="decrement-button-1"
      >
        -1
      </button>
      <span className="count" data-test-id="count">
        {count}
      </span>
      <button
        onClick={() => {
          if (props.onIncrementClick) {
            props.onIncrementClick(1);
          }
        }}
        data-test-id="increment-button-1"
      >
        +1
      </button>
      <button
        onClick={() => {
          if (props.onIncrementClick) {
            props.onIncrementClick(10);
          }
        }}
        data-test-id="increment-button-10"
      >
        +10
      </button>
      <button
        onClick={() => {
          if (props.onResetClick) {
            props.onResetClick();
          }
        }}
        data-test-id="reset-button"
      >
        reset
      </button>
    </div>
  );
};

export default Counter;
