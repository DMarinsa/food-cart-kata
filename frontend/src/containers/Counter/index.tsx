import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/Button';
import {counterLoadingSelector, counterSelector} from '../../store/modules/counter/selectors';
import {decrementCounterAction, incrementCounterRequestAction} from '../../store/modules/counter/actions';
import {CounterStyles} from './CounterStyles';

export const Counter: React.FC = () => {
    const dispatch = useDispatch();
    const counterValue = useSelector(counterSelector);
    const isLoading = useSelector(counterLoadingSelector);

    const handleIncrementClick = useCallback(() => {
        dispatch(incrementCounterRequestAction());
    }, [dispatch]);

    const handleDecrementClick = useCallback(() => {
        dispatch(decrementCounterAction());
    }, [dispatch]);

    return (
        <CounterStyles>
            <div className="counterContainer">
                <h1>Counter</h1>
                <p>Current value: <span className="currentCounterValue">{counterValue}</span></p>
                <div className="buttons">
                    <Button onClick={handleIncrementClick} disabled={isLoading}>Increment</Button>
                    <Button onClick={handleDecrementClick} disabled={isLoading}>Decrement</Button>
                </div>
            </div>
        </CounterStyles>
    )
};

export default Counter;
