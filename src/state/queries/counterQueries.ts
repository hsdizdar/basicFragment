import { gql } from '@apollo/client';

export const GET_COUNTER = gql`
  query GetCounterValue {
    counter @client
  }
`;

export const GET_CONFIG = gql`
  query GetConfigValue {
    process @client
  }
`;
