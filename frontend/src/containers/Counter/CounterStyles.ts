import styled from 'styled-components';

export const CounterStyles = styled.section`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-self: center;
    padding-top: 22px;
  
    .currentCounterValue {
        color: red;
    }
    
    .buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
`
