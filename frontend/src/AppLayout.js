import Header from 'components/Header';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export default function AppLayout({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}
