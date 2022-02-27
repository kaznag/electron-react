import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countSelector } from '../store/counter/counterSelector';
import { decrement, increment, reset } from '../store/counter/counterSlice';

const useCounterFacade = () => {
  const count = useSelector(countSelector);
  const dispatch = useDispatch();

  const incrementCount = useCallback((count: number) => dispatch(increment(count)), [dispatch]);
  const decrementCount = useCallback((count: number) => dispatch(decrement(count)), [dispatch]);
  const resetCount = useCallback(() => dispatch(reset()), [dispatch]);

  return {
    count,
    incrementCount,
    decrementCount,
    resetCount,
  };
};

export { useCounterFacade };
