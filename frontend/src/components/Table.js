import React from 'react';
import styled from 'styled-components';
import { SemipolarLoading } from 'react-loadingg';

const Container = styled.div`
  display: grid;
`;
const Table = styled.table`
  display: grid;
  border-collapse: collapse;
  grid-template-columns:
    min-content
    minmax(150px, 1.5fr)
    minmax(150px, 1.5fr)
    minmax(150px, 1fr)
    minmax(150px, 1fr);
  grid-template-rows: max-content auto;
  height: ${({ games }) => (games.length < 7 ? 'auto' : '345px')};

  /* scrollbar */
  overflow: auto;
  padding-right: 5px;
  scrollbar-width: thin;

  scroll-padding: 100px;

  ::-webkit-scrollbar {
    width: 7px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: hsl(196deg 100% 44%);
    border-radius: 25px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  tr {
    display: contents;
  }

  th,
  td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  th {
    padding: 0 1.5em 0.5em 1.5em;
    position: sticky;
    top: 0;
    font-size: 1.1rem;
    background: #fff;
    color: gray;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    text-transform: capitalize;
  }

  td {
    height: 45px;
    padding: 0.8em 1.6em 0.8em 1.6em;
  }

  th {
    text-align: left;
  }

  tbody {
    align-items: flex-start;
    tr {
      cursor: pointer;
      :hover {
        td {
          transition: background 0.2s;
          background: rgba(0, 0, 0, 0.0625);
        }
      }
    }
  }
`;

const TableHead = styled.thead`
  display: contents;
`;

const TableBody = styled.tbody`
  display: contents;
`;

const LoaderContainer = styled.div`
  grid-column: 1/6;
  position: relative;
  display: grid;
  height: 30vh;

  div {
    margin: 0 auto;
  }
`;

export default function TableComponent({ type, header, isLoading, games }) {
  return (
    <Container>
      <Table games={games}>
        <TableHead>
          <tr>
            <th>#</th>
            {header.map((head) => (
              <th>{head}</th>
            ))}
          </tr>
        </TableHead>
        <TableBody>
          {!isLoading ? (
            games.map((game, index) => (
              <tr key={index}>
                <td>{game.position}</td>
                <td>{game.game}</td>
                <td>{game.platforms.join(', ')}</td>
                <td>{game.genre}</td>
                <td>
                  {type === 'byTimePlayed'
                    ? game.totalPlayTime
                    : game.totalPlayers}
                </td>
              </tr>
            ))
          ) : (
            <LoaderContainer>
              <SemipolarLoading />
            </LoaderContainer>
          )}
        </TableBody>
      </Table>
    </Container>
  );
}
