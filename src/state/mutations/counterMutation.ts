import { GET_COUNTER } from '../queries/counterQueries';
import { gql } from '@apollo/client';

export const UPDATE_COUNTER = gql`
  mutation updateCounter($offset: Number!) {
    updateCounter(offset: $offset) @client
  }
`;

export const CounterMutations = {
  updateCounter: (_, variables, { cache }) => {
    const data = cache.readQuery({ query: GET_COUNTER });
    const newCounterValue = data.counter + variables.offset;
    cache.writeData({
      data: { counter: newCounterValue },
    });
    return null;
  },
};
