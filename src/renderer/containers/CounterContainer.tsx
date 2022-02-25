import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Counter from '../components/Counter';
import { countSelector } from '../store/counter/counterSelector';
import { decrement, increment, reset } from '../store/counter/counterSlice';

type Props = {};

const CounterContainer: React.FC<Props> = () => {
  const count = useSelector(countSelector);
  const dispatch = useDispatch();

  return (
    <Counter
      count={count}
      onIncrementClick={(count: number) => dispatch(increment(count))}
      onDecrementClick={(count: number) => dispatch(decrement(count))}
      onResetClick={() => dispatch(reset())}
    ></Counter>
  );
};

export default CounterContainer;
