import React, { useEffect, useState } from 'react';
import Table from 'components/Table';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(min-content, 75%);
  justify-content: center;
  gap: 50px 0;
`;

export default function Charts() {
  const [topGamesByTimePlayed, setTopGamesByTimePlayed] = useState([]);
  const [topGamesByPlayers, setTopGamesByPlayers] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://192.168.1.8:5000/select_top_by_playtime?genre=&platform=',
    })
      .then((res) => {
        setTopGamesByTimePlayed(res.data);
      })
      .catch((err) => console.error(err));
    axios({
      method: 'get',
      url: 'http://192.168.1.8:5000/select_top_by_players?genre=&platform=',
    })
      .then((res) => {
        setTopGamesByPlayers(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      {/* <TabsContainer>
        Tab
      </TabsContainer> */}
      <Table
        type={'byTimePlayed'}
        header={['game', 'platforms', 'genre', 'Total play time']}
        games={topGamesByTimePlayed}
      />
      <Table
        type={'byPlayers'}
        header={['game', 'platforms', 'genre', 'Number of players']}
        games={topGamesByPlayers}
      />
    </Container>
  );
}
