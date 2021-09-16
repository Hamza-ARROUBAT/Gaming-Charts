import React, { useEffect, useState } from 'react';
import Table from 'components/Table';
import styled from 'styled-components';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(min-content, 75%);
  justify-content: center;
  gap: 25px 0;
`;

const Header = styled.div``;

const SelectContainer = styled.div`
  div {
    height: 35px;
    margin: 0;
    div {
      margin: 0;
      padding: 0.55em 0.8em;
      border-radius: 20px;
    }
  }
`;

export default function Charts() {
  const [topGamesByTimePlayed, setTopGamesByTimePlayed] = useState([]);
  const [topGamesByPlayers, setTopGamesByPlayers] = useState([]);

  const getTopGamesByTimePlayed = () => {
    axios({
      method: 'get',
      url: 'http://192.168.0.107:5000/select_top_by_playtime?genre=&platform=',
    })
      .then((res) => {
        setTopGamesByTimePlayed(res.data);
      })
      .catch((err) => console.error(err));
  };

  const getTopGamesByPlayers = () => {
    axios({
      method: 'get',
      url: 'http://192.168.0.107:5000/select_top_by_players?genre=&platform=',
    })
      .then((res) => {
        setTopGamesByPlayers(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTopGamesByTimePlayed();
  }, []);

  const [tab, setTab] = useState(0);

  const handleChange = (event) => {
    if (event.target.value === 0) {
      if (topGamesByTimePlayed.length === 0) {
        setTab(0);
        getTopGamesByTimePlayed();
      } else {
        setTab(0);
      }
    } else if (event.target.value === 1) {
      if (topGamesByPlayers.length === 0) {
        setTab(1);
        getTopGamesByPlayers();
      } else {
        setTab(1);
      }
    }
  };

  return (
    <Container>
      <Header>
        <SelectContainer>
          <FormControl sx={{ width: 165 }}>
            <Select
              value={tab}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={0} sx={{ width: 160 }}>
                Time Played
              </MenuItem>
              <MenuItem value={1} sx={{ width: 160 }}>
                Players
              </MenuItem>
            </Select>
          </FormControl>
        </SelectContainer>
      </Header>
      {tab === 0 && (
        <Table
          type={'byTimePlayed'}
          header={['game', 'platforms', 'genre', 'Total play time']}
          games={topGamesByTimePlayed}
        />
      )}
      {tab === 1 && (
        <Table
          type={'byPlayers'}
          header={['game', 'platforms', 'genre', 'Number of players']}
          games={topGamesByPlayers}
        />
      )}
    </Container>
  );
}
