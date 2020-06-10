import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import initialState from './initialState';
import { CounterMutations } from './mutations/counterMutation';

const isServer = typeof window === 'undefined';

const cache = isServer ? new InMemoryCache() : new InMemoryCache().restore(window.__BASICFRAGMENT_INITIAL_STATE__);

console.log(cache);

isServer ? console.log('') : console.log(window);

const client = new ApolloClient({
  cache,
  resolvers: {
    Mutation: { ...CounterMutations },
  },
});

isServer ? cache.writeData({ data: initialState }) : null;
console.log('writeData', cache);

export default client;
