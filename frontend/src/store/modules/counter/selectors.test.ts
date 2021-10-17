import { initialState } from './model';
import {counterLoadingSelector, counterSelector} from './selectors';

describe('Counter selectors', () => {
  describe('counterSelector', () => {
    it('selects correctly', () => {
      const inputState = { ...initialState };
      expect(counterSelector.resultFunc(inputState)).toEqual(1);
    });
  });

  describe('counterLoadingSelector', () => {
    it('selects correctly', () => {
      const inputState = { ...initialState };
      expect(counterLoadingSelector.resultFunc(inputState)).toEqual(false);
    });
  });
});
