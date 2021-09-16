import React from 'react';
import Table from 'components/Table';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  gap: 50px 0;
`;

export default function Charts() {
  return (
    <Container>
      <Table header={['game', 'platforms', 'genre', 'Total play time']} />
      <Table header={['game', 'platforms', 'genre', 'Number of players']} />
    </Container>
  );
}
