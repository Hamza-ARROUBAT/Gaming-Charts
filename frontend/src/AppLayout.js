import Header from "components/Header";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  gap: 250px 0;
`

export default function AppLayout({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}
