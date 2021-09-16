import Header from "components/Header";
import React from "react";
import styled from "styled-components";

const Container = styled.div`

`

export default function AppLayout({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}
