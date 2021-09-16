import React, { useEffect, useState } from 'react';
import Table from 'components/Table';
import styled from 'styled-components';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Filter as FilterSvg } from '@styled-icons/bootstrap/Filter';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(min-content, 75%);
  justify-content: center;
  gap: 35px 0;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: max-content min-content;
  justify-content: space-between;
  align-items: center;
  gap: 25px 0;
`;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  align-items: center;
  gap: 0 20px;

  p {
    margin: 0;
  }
`;
const Filter = styled.div`
  display: grid;
  gap: 10px 0;
`;

const SelectContainer = styled.div`
  div {
    height: 35px;
    margin: 0;
    div {
      margin: 0;
      padding: 0.55em 0.8em;
      border-radius: 10px;
    }
  }
`;

const FilterButton = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  align-items: center;
  gap: 0 10px;
  cursor: pointer;
  background: hsl(0, 0%, 95%);
  border: 1px solid hsl(0, 0%, 85%);
  border-radius: 10px;
  padding: 0.5em 1em;
  height: min-content;

  svg {
    width: 15px;
    transition: color 0.25s;
  }

  p {
    margin: 0;
    transition: color 0.25s;
  }

  transition: background 0.25s, border 0.25s;
  ${({ isClicked }) =>
    isClicked &&
    `background: hsl(196deg 100% 44%);
     color: white;
     border: 1px solid hsl(0, 0%, 100%);

     svg {
       color: white;
     }
  `}
`;

const Body = styled.div``;

export default function Charts() {
  const [topGamesByTimePlayed, setTopGamesByTimePlayed] = useState([]);
  const [topGamesByPlayers, setTopGamesByPlayers] = useState([]);

  const [platform, setPlatform] = useState('');
  const [genre, setGenre] = useState('');

  const getTopGamesByTimePlayed = () => {
    axios({
      method: 'get',
      url: `http://192.168.0.107:5000/select_top_by_playtime?genre=${genre}&platform=${platform}`,
    })
      .then((res) => {
        setTopGamesByTimePlayed(res.data);
      })
      .catch((err) => console.error(err));
  };

  const getTopGamesByPlayers = () => {
    axios({
      method: 'get',
      url: `http://192.168.0.107:5000/select_top_by_players?genre=${genre}&platform=${platform}`,
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

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      if (topGamesByTimePlayed.length === 0) {
        setTab(0);
        getTopGamesByTimePlayed();
      } else {
        setTab(0);
      }
    } else if (newValue === 1) {
      if (topGamesByPlayers.length === 0) {
        setTab(1);
        getTopGamesByPlayers();
      } else {
        setTab(1);
      }
    }
  };

  const [isFilterClicked, setIsFilterClicked] = useState(false);

  const handlePlatformChange = (event) => {
    setPlatform(event.target.value);
    if (tab === 0) {
      getTopGamesByTimePlayed();
    } else {
      getTopGamesByPlayers();
    }
  };
  const handleGenreChange = (event) => {
    setGenre(event.target.value);
    if (tab === 0) {
      getTopGamesByTimePlayed();
    } else {
      getTopGamesByPlayers();
    }
  };

  const allPlatforms = [
    'PC',
    'Xbox 360',
    'PS3',
    'Xbox One',
    'PS4',
    'ANDROID',
    'IOS',
    'NINTENDO Switch',
  ];
  const allGenres = [
    'RPG',
    'MMORPG',
    'Multiplayer',
    'Strategy',
    'MOBA',
    'FPS',
    'Sandbox',
  ];

  return (
    <Container>
      <Header>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            aria-label="Select top games"
          >
            <Tab label="Top by Play time" value={0} />
            <Tab label="Top by Players" value={1} />
          </Tabs>
        </Box>

        <FilterButton
          isClicked={isFilterClicked}
          onClick={() => {
            setIsFilterClicked(!isFilterClicked);
          }}
        >
          <FilterSvg />
          <p>Filter</p>
        </FilterButton>

        {isFilterClicked && (
          <FiltersContainer>
            {/* Filter By Platforms */}
            <Filter>
              <p>Platform</p>
              <SelectContainer>
                <FormControl sx={{ width: 165 }}>
                  <Select
                    value={platform}
                    onChange={handlePlatformChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value=""> - </MenuItem>
                    {allPlatforms.map((platform) => (
                      <MenuItem value={platform} sx={{ width: 160 }}>
                        {platform}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </SelectContainer>
            </Filter>
            {/* Filter By Genre */}
            <Filter>
              <p>Genre</p>
              <SelectContainer>
                <FormControl sx={{ width: 165 }}>
                  <Select
                    value={genre}
                    onChange={handleGenreChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value=""> - </MenuItem>
                    {allGenres.map((genre) => (
                      <MenuItem value={genre} sx={{ width: 160 }}>
                        {genre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </SelectContainer>
            </Filter>
          </FiltersContainer>
        )}
      </Header>
      <Body>
        {topGamesByTimePlayed && tab === 0 && (
          <Table
            type={'byTimePlayed'}
            header={['game', 'platforms', 'genre', 'Total play time']}
            games={topGamesByTimePlayed}
          />
        )}
        {topGamesByPlayers && tab === 1 && (
          <Table
            type={'byPlayers'}
            header={['game', 'platforms', 'genre', 'Number of players']}
            games={topGamesByPlayers}
          />
        )}
      </Body>
    </Container>
  );
}
