/* only server side render */

import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: antiquewhite;
`;

const StyledMessage = styled.p`
  color: #333;
  font-size: 25px;
`;

const StyledLink = styled.a`
  color: #000;
  font-size: 25px;
  text-decoration: underline;
`;

const NotFound: React.SFC = () => (
  <StyledWrapper>
    <StyledMessage>No match</StyledMessage>
    <StyledLink href="/">Goto Homepage</StyledLink>
  </StyledWrapper>
);

export default NotFound;
