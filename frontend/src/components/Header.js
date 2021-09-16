import React from "react";
import styled from "styled-components";
import { BarChartLineFill as Logo } from "@styled-icons/bootstrap/BarChartLineFill";
import { Link, NavLink } from "react-router-dom";

const Nav = styled.nav`
  display: grid;
  grid-template-columns: max-content auto;
  gap: 0 100px;
  padding: 0 1em;
  background: hsl(0, 0%, 100%);
`;

const StyledLink = styled(Link)`
  display: grid;
  grid-template-columns: min-content max-content;
  align-items: center;
  gap: 0 10px;

  svg {
    width: 35px;
    color: #1877f2;
    cursor: pointer;
  }

  p {
    margin: 0;
    font-weight: bold;
  }
`;

const LinksContainer = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  gap: 0 25px;
`;
const StyledNavLink = styled(NavLink)`
  &.selected {
    p {
      color: #1877f2;
    }
  }
`;

export default function Header() {
  return (
    <Nav>
      <StyledLink to="/">
        <Logo />
        <p>Gaming Charts</p>
      </StyledLink>
      <LinksContainer>
        <StyledNavLink exact to="/" activeClassName="selected">
          <p>Home</p>
        </StyledNavLink>
        <StyledNavLink exact to="/charts" activeClassName="selected">
          <p>Charts</p>
        </StyledNavLink>
      </LinksContainer>
    </Nav>
  );
}
