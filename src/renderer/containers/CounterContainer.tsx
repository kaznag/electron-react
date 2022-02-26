import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Counter from '../components/Counter';
import { countSelector } from '../store/counter/counterSelector';
import { decrement, increment, reset } from '../store/counter/counterSlice';

function CounterContainer(): JSX.Element {
  const count = useSelector(countSelector);
  const dispatch = useDispatch();

  const incrementCount = useCallback((count: number) => dispatch(increment(count)), [dispatch]);
  const decrementCount = useCallback((count: number) => dispatch(decrement(count)), [dispatch]);
  const resetCount = useCallback(() => dispatch(reset()), [dispatch]);

  return (
    <Counter
      count={count}
      onIncrementClick={(count: number) => incrementCount(count)}
      onDecrementClick={(count: number) => decrementCount(count)}
      onResetClick={() => resetCount()}
    ></Counter>
  );
}

export default CounterContainer;
