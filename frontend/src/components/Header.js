import React from "react";
import styled from "styled-components";
import { BarChartLineFill as Logo } from "@styled-icons/bootstrap/BarChartLineFill";
import { Link, NavLink } from "react-router-dom";

const Nav = styled.nav`
  grid-column: 1/4;
  display: grid;
  grid-template-columns: minmax(max-content, 20%) auto;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 3px;
  padding: 0 0.75em;
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
    div {
      div {
        border-color: #1877f2;
        svg {
          color: #1877f2;

          :hover {
            background: none;
          }
        }
      }
    }
  }
`;

export default function Header() {
  return (
    <Nav>
      <StyledLink to="/home">
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
