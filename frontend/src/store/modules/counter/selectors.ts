import {ICounterDomain} from './model';
import {createSelector} from 'reselect';

export const counterDomain = (state: any): ICounterDomain => state.counter;

export const counterSelector = createSelector(
    counterDomain,
    (domain: ICounterDomain): ICounterDomain['value'] => domain.value
);

export const counterLoadingSelector = createSelector(
    counterDomain,
    (domain: ICounterDomain): ICounterDomain['loading'] => domain.loading
);
