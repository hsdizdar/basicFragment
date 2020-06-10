/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import MultiSelect from 'react-multi-select-component';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const LeftSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 50px;
  border-width: thin;
  border-style: solid;
  border-color: #cccccc;
  padding: 10px;
`;

const RightSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SubTitle = styled.span`
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
  width: 50px;
  text-align: left;
`;

const Input = styled.input`
  width: 200px;
  height: 25px;
  border-width: thin;
  border-style: solid;
  border-color: #cccccc;
  border-radius: 5px;
  padding: 5px;
`;

const Button = styled.button`
  width: 210px;
  height: 35px;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  text-color: white;
  margin-top: 20px;
`;

const LogContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-width: thin;
  border-style: solid;
  border-color: #cccccc;
`;

const LogTitle = styled.span`
  background-color: #4caf50;
  text-align: center;
  padding: 5px;
  color: white;
  width: 300px;
`;

const LogContent = styled.p`
  text-align: center;
  padding: 4px;
  width: 300px;
  margin: 0px;
`;

const SearchLog: React.SFC = () => {
  const options = [
    { label: 'Info', value: 'info' },
    { label: 'Warn', value: 'warn' },
    { label: 'Error', value: 'error' },
  ];
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [selected, setSelected] = useState([]);
  const [logsInfo, setLogsInfo] = useState({ message: null, level: null, date: null });
  const [allLogs, changeLogs] = useState([]);

  const submit = () => {
    setLogsInfo({
      message: message === '' ? null : message,
      level: selected.length === 0 ? null : selected.map((item) => item.value),
      date: date === '' ? null : date,
    });
  };

  const getLogs = () => {
    fetch('http://localhost:81/getLogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logsInfo),
    }).then((data) => data.json().then((text) => changeLogs(text.data)));
  };

  useEffect(() => {
    getLogs();
  }, [logsInfo]);

  const showLogs = () => {
    if (allLogs.length > 0) {
      return allLogs.map((item) => {
        return (
          <Container>
            <LogContainer>
              <LogContent>{item.timestamp}</LogContent>
            </LogContainer>
            <LogContainer>
              <LogContent>{item.level}</LogContent>
            </LogContainer>
            <LogContainer>
              <LogContent>{item.message}</LogContent>
            </LogContainer>
          </Container>
        );
      });
    } else {
      return (
        <Container>
          <LogContainer>
            <LogContent>-</LogContent>
          </LogContainer>
          <LogContainer>
            <LogContent>-</LogContent>
          </LogContainer>
          <LogContainer>
            <LogContent>-</LogContent>
          </LogContainer>
        </Container>
      );
    }
  };

  return (
    <Container>
      <LeftSubContainer>
        <h2>Log Search</h2>
        <SubTitle>Message: </SubTitle>
        <Input type="text" onChange={(event) => setMessage(event.target.value)} />
        <SubTitle>Level: </SubTitle>
        <MultiSelect
          disableSearch={true}
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy={'Select'}
        />
        <SubTitle>Date: </SubTitle>
        <Input
          placeholder="DD/MM/YYYY"
          type="date"
          max="2200-12-31"
          onChange={(event) => {
            const year = event.target.value.substring(0, 4);
            const month = event.target.value.substring(5, 7);
            const day = event.target.value.substring(8, 10);
            setDate(month + '/' + day + '/' + year);
          }}
        />
        <Button type="button" onClick={() => submit()}>
          Submit
        </Button>
      </LeftSubContainer>
      <RightSubContainer>
        <Container>
          <LogTitle>Date</LogTitle>
          <LogTitle>Level</LogTitle>
          <LogTitle>Message</LogTitle>
        </Container>
        {showLogs()}
      </RightSubContainer>
    </Container>
  );
};

export default SearchLog;
