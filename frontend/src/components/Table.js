import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
`;
const Table = styled.table`
  display: grid;
  border-collapse: collapse;
  grid-template-columns:
    minmax(150px, 1fr)
    minmax(150px, 1.67fr)
    minmax(150px, 1.67fr)
    minmax(150px, 1fr);

  padding: 0 10em;

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

export default function TableComponent({ header }) {
  return (
    <Container>
      {true ? (
        <Table>
          <TableHead>
            <tr>
              {header.map((head) => (
                <th>{head}</th>
              ))}
            </tr>
          </TableHead>
          <TableBody>
            {/* {transactions.map((transaction) => ( */}
            <tr>
              <td>{'Civilization 6'}</td>
              <td>{'PC, XBOX, PS4'}</td>
              <td>{'RPG'}</td>
              <td>{'5'}</td>
            </tr>
            <tr>
              <td>{'Civilization 6'}</td>
              <td>{'PC, XBOX, PS4'}</td>
              <td>{'RPG'}</td>
              <td>{'5'}</td>
            </tr>
            <tr>
              <td>{'Civilization 6'}</td>
              <td>{'PC, XBOX, PS4'}</td>
              <td>{'RPG'}</td>
              <td>{'5'}</td>
            </tr>
            {/* ))} */}
          </TableBody>
        </Table>
      ) : (
        <MessageContainer>Aucune transaction</MessageContainer>
      )}
    </Container>
  );
}
