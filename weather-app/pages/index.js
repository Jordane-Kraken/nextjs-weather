import React from 'react';
import Head from 'next/head'
import Loader from '../components/Loader';
import Weather from '../components/Weather';
import Error from '../components/Error';
import { Container, Text, InputGroup, Input, InputRightElement, Button, Heading } from '@chakra-ui/react';
import { List, ListItem, UnorderedList } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons';
import styles from '../styles/Home.module.scss'

export default function Home( {data} ) {
  const [value, setValue] = React.useState("")
  const [weather, setWeather] = React.useState({});
  const [isLoading, setisLoading] = React.useState(false);
  const [dataFetching, setDataFetching] = React.useState(false);
  const [suggestionsList, setSuggestionsList] = React.useState([]);
  const [dataSuggestions, setDataSuggestions] = React.useState(false);
  const [cityName, setCityName] = React.useState();

  const moment = require('moment');
  const date = moment().locale('fr').format('dddd DD-MM-YYYY');

  const hour = moment().locale('fr').format('HH');

  const getWeather = async() => {
    let input = document.getElementById('inputCity');
    if (input.value !== '') {
    setisLoading(true);
    const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=fr&appid=${API_KEY}`);
    const response = await apiCall.json();
    if (response) {
    setWeather(response);
    setisLoading(false);
    setDataFetching(true);
    }

    if(response.cod !== 200) {
      console.log('erreur');
      setDataFetching(false);
    }
  
    }
  }

    const getAutocomplete = async() => {
      let input = document.getElementById('inputCity');
    if (input.value !== '') {
    setDataSuggestions(false);
      const apiCall = await fetch(`https://autocomplete.search.hereapi.com/v1/autocomplete?q=${cityName}&apiKey=${API_KEY_HERE}`);
      const response = await apiCall.json();

      if (response.items){
        setDataSuggestions(true); 
        setSuggestionsList(response.items);
      }
      else {
        setDataSuggestions(false);
      }
    }
    }

    const handleChange = (event) => {
       setCityName(event.target.value);
      getAutocomplete();
      }

    const changeValue = (suggestion) => {
        setValue(suggestion.title);
        let city = suggestion.address.city;
        setCityName(city); 
    }
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    getWeather();
  }

  return (
    <Container
    minHeight="100vh"
    textAlign="center"
    maxW="100%"
    className={styles.container}
    backgroundImage= {(hour > 20 || hour < 6) ? './images/night1.jpeg' : './images/day1.jpeg' }
    backgroundPosition="center"
    backgroundSize="cover"
    id="container"
    color= {(hour > 20 || hour < 6) ? '#fff' : '#000' }
    >
      <Head>
        <title>NextJS Weather App</title>
        <meta name="description" content="next js weather app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
      <div className={styles.header__bg}></div>
      <h1 className={styles.title}>Next JS Application Météo</h1>       
      </header>

      <div className={styles.paragraph}>📅 Nous sommes le {date}</div>

      <main className={styles.main}>
      <h2 className={styles.subtitle}>Quel temps fait-il aujourd'hui ? 😄</h2>
      <div className={styles.loader}>
      {isLoading && (
        <Loader />
      )}
      </div>
      {dataFetching && typeof weather.main != "undefined" && (
      <Weather {...weather} />
      )
      }
      <form onSubmit={handleSubmit} className={styles.form}>
        <Text mb="15px" fontSize="20px">Ville :</Text>
        <InputGroup size="lg" maxW="65%" margin="auto">
        <Input
          value={cityName}
          onChange={handleChange}
          placeholder="Ville"
          size="lg"
          marginBottom= '1em'
          _placeholder={{ color: 'black' }}
          focusBorderColor= 'orange.400'
          id='inputCity'
          isRequired
        />
        <InputRightElement>
        <Button
        type="submit"
        >
        <SearchIcon color= '#000'/>
        </Button>
        </InputRightElement>
        </InputGroup>
        {suggestionsList && (
        <UnorderedList>
        {suggestionsList.map((suggestion) => 
          <ListItem className={styles.listItem} listStyleType="none" key={suggestion.id} onClick={() => {changeValue(suggestion)}}>{suggestion.title}</ListItem>
        )}
        </UnorderedList>
      )}
      </form>


 </main>

 <div>
   
 </div>
    </Container>

  )
}

