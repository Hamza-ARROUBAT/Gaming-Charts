import React from 'react';
import styled from 'styled-components';

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
  height: 165px;

  overflow: auto;

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
    padding: 0.8em 1.6em 0.8em 1.6em;
  }

  th {
    text-align: left;
  }

  tbody {
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

const MessageContainer = styled.div`
  display: grid;
  place-content: center;
  font-size: 1.2rem;
  text-decoration: underline;
`;

export default function TableComponent({ type, header, games }) {
  return (
    <Container>
      {true ? (
        <Table>
          <TableHead>
            <tr>
              <th>#</th>
              {header.map((head) => (
                <th>{head}</th>
              ))}
            </tr>
          </TableHead>
          <TableBody>
            {games.length !== 0 ? (
              games.map((game, index) => (
                <tr>
                  <td>{index + 1}</td>
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
              <></>
            )}
          </TableBody>
        </Table>
      ) : (
        <MessageContainer>Aucune transaction</MessageContainer>
      )}
    </Container>
  );
}
