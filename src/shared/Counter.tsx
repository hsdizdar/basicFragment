import React, { useState } from 'react';
import { logger } from '../logger';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_COUNTER, GET_CONFIG } from '../state/queries/counterQueries';
import { UPDATE_COUNTER } from '../state/mutations/counterMutation';
import { useInjection } from '../providers/ioc.react';
import { IProvider } from '../providers/providers';

const Counter: React.SFC = () => {
  const { data, loading, error } = useQuery(GET_COUNTER);
  const configData = useQuery(GET_CONFIG).data;
  const [, setErrorCatch] = React.useState(null);
  const [increment] = useMutation(UPDATE_COUNTER, { variables: { offset: 1 } });
  const [decrement] = useMutation(UPDATE_COUNTER, { variables: { offset: -1 } });
  const provider = useInjection<IProvider<string>>('nameProvider');

  const logIncrement = () => {
    logger.error('ERROR');
    logger.info('INFO');
    logger.warn('WARN');
    logger.debug('DEBUG');
    increment();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (data.counter < 5) {
    return (
      <div>
        <p>Provider:</p>
        <p>{provider.provide()}</p>
        <p>Counter: {data?.counter}</p>
        <p>Process: {configData.process}</p>
        <button type="button" onClick={() => logIncrement()}>
          Increase
        </button>
        <button type="button" onClick={() => decrement()}>
          Decrease
        </button>
      </div>
    );
  } else {
    logger.error('Error from Boundary');
    setErrorCatch(() => {
      throw new Error('error');
    });
  }
};

export default Counter;
