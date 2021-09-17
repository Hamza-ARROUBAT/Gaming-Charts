import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from 'assets/images/png/logo.png';

const Nav = styled.nav`
  display: grid;
  grid-template-columns: min-content auto;
  align-items: center;
  gap: 0 100px;
  padding: 0.8em 2em;
  background: hsl(0, 0%, 100%);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 4px;
`;

const StyledLink = styled(Link)`
  display: grid;
  grid-template-columns: min-content max-content;
  align-items: center;
  gap: 0 15px;
  img {
    width: 50px;
  }

  p {
    margin: 0;
    font-weight: bold;
    font-size: 1.3rem;
    color: hsl(196deg 100% 30%);
  }
`;

export default function Header() {
  return (
    <Nav>
      <StyledLink to="/">
        <img src={logo} alt="Logo" />
        <p>Gaming Charts</p>
      </StyledLink>
    </Nav>
  );
}
