import React from 'react';
import { Counter } from '../components';
import { useCounterFacade } from './CounterFacade';

function CounterContainer(): JSX.Element {
  const { count, incrementCount, decrementCount, resetCount } = useCounterFacade();

  return (
    <Counter
      count={count}
      onIncrementClick={(count: number) => incrementCount(count)}
      onDecrementClick={(count: number) => decrementCount(count)}
      onResetClick={() => resetCount()}
    ></Counter>
  );
}

export { CounterContainer };
