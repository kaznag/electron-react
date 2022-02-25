import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

const counterSelector = (state: RootState) => state.counter;

const countSelector = createSelector(counterSelector, (state) => state.count);

export { countSelector };
