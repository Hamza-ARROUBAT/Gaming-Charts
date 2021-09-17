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

import { Search } from '@styled-icons/boxicons-regular/Search';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(min-content, 75%);
  grid-auto-rows: min-content;
  justify-content: center;
  gap: 35px 0;
  margin-top: 20px;
`;

const Title = styled.h1`
  color: hsl(201deg 100% 11%);
  margin-bottom: 0;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: auto min-content min-content;
  align-items: center;
  gap: 25px 20px;
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

  p {
    font-weight: bold;
  }
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
  padding: 0.6em 1.5em;
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

const SearchBar = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  align-items: center;
  gap: 0 10px;

  border: 2px solid hsl(0, 0%, 80%);
  border-radius: 20px;
  padding: 0.5em 1em;

  svg {
    width: 15px;
    transition: color 0.5s;
  }

  input {
    outline: none;
    border: none;
    background: transparent;
    font-size: 1rem;
  }

  transition: border 0.2s;
  :focus-within {
    border: 2px solid hsl(196deg 100% 44%);

    svg {
      color: hsl(196deg 100% 44%);
    }
  }
`;

const Body = styled.div``;

export default function Home() {
  const [topGamesByTimePlayed, setTopGamesByTimePlayed] = useState([]);
  const [topGamesByPlayers, setTopGamesByPlayers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [platform, setPlatform] = useState('');
  const [genre, setGenre] = useState('');
  const [prevPlatform, setPrevPlatform] = useState('');
  const [prevGenre, setPrevGenre] = useState('');

  const getTopGamesByTimePlayed = (genre, platform) => {
    axios({
      method: 'get',
      url: `http://192.168.0.107:5000/select_top_by_playtime?genre=${genre}&platform=${platform}`,
    })
      .then((res) => {
        let gamesArr = [];
        res.data.map((game, index) => {
          gamesArr.push({ position: index + 1, ...game });
          return game;
        });
        setTopGamesByTimePlayed(gamesArr);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const getTopGamesByPlayers = (genre, platform) => {
    axios({
      method: 'get',
      url: `http://192.168.0.107:5000/select_top_by_players?genre=${genre}&platform=${platform}`,
    })
      .then((res) => {
        let gamesArr = [];
        res.data.map((game, index) => {
          gamesArr.push({ position: index + 1, ...game });
          return game;
        });
        setTopGamesByPlayers(gamesArr);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTopGamesByTimePlayed('', '');
  }, []);

  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSearched('');
    if (newValue === 0) {
      if (
        topGamesByTimePlayed.length === 0 ||
        prevGenre !== genre ||
        prevPlatform !== platform
      ) {
        setTab(0);
        setIsLoading(true);
        getTopGamesByTimePlayed(genre, platform);
      } else {
        setTab(0);
      }
    } else if (newValue === 1) {
      if (
        topGamesByPlayers.length === 0 ||
        prevGenre !== genre ||
        prevPlatform !== platform
      ) {
        setTab(1);
        setIsLoading(true);
        getTopGamesByPlayers(genre, platform);
      } else {
        setTab(1);
      }
    }
  };

  const [isFilterClicked, setIsFilterClicked] = useState(false);

  const handlePlatformChange = (event) => {
    setPrevPlatform(platform);
    setPlatform(event.target.value);
    if (tab === 0) {
      setIsLoading(true);
      getTopGamesByTimePlayed(genre, event.target.value);
    } else {
      setIsLoading(true);
      getTopGamesByPlayers(genre, event.target.value);
    }
  };
  const handleGenreChange = (event) => {
    setPrevGenre(genre);
    setGenre(event.target.value);
    if (tab === 0) {
      setIsLoading(true);
      getTopGamesByTimePlayed(event.target.value, platform);
    } else {
      setIsLoading(true);
      getTopGamesByPlayers(event.target.value, platform);
    }
  };

  const [searched, setSearched] = useState('');

  const [searchedTopGamesByTimePlayed, setSearchedTopGamesByTimePlayed] =
    useState([]);
  const [searchedTopGamesByPlayers, setSearchedTopGamesByPlayers] = useState(
    []
  );

  const handleSearchChange = (e) => {
    setSearched(e.target.value);
    setIsLoading(true);

    if (tab === 0) {
      const filtred = topGamesByTimePlayed.filter((element) =>
        element.game.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchedTopGamesByTimePlayed(filtred);
      setIsLoading(false);
    } else {
      const filtred = topGamesByPlayers.filter((element) =>
        element.game.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchedTopGamesByPlayers(filtred);
      setIsLoading(false);
    }
  };

  const allPlatforms = [
    'PC',
    'Xbox 360',
    'PS3',
    'Xbox One',
    'PS4',
    'PS5',
    'Nintendo Switch',
    'Android',
  ];
  const allGenres = [
    'RPG',
    'Action RPG',
    'MMORPG',
    'Multiplayer',
    'MOBA',
    'Sandbox',
    'Card Game',
    'Stealth',
    'FPS',
    'Sport',
  ];

  return (
    <Container>
      <Title>Top Games 🏆</Title>
      <Header>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            aria-label="Select top games"
          >
            <Tab label="Play time" value={0} />
            <Tab label="Players" value={1} />
          </Tabs>
        </Box>

        <SearchBar>
          <Search />
          <input
            type="text"
            placeholder="Search by name"
            value={searched}
            onChange={handleSearchChange}
          />
        </SearchBar>

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
        {tab === 0 && (
          <Table
            type={'byTimePlayed'}
            header={['game', 'platforms', 'genre', 'Total play time']}
            isLoading={isLoading}
            games={
              !searched ? topGamesByTimePlayed : searchedTopGamesByTimePlayed
            }
          />
        )}
        {tab === 1 && (
          <Table
            type={'byPlayers'}
            header={['game', 'platforms', 'genre', 'Number of players']}
            isLoading={isLoading}
            games={!searched ? topGamesByPlayers : searchedTopGamesByPlayers}
          />
        )}
      </Body>
    </Container>
  );
}
