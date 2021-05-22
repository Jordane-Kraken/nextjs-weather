import React from 'react';
import Head from 'next/head'
import Loader from '../components/Loader';
import Weather from '../components/Weather';
import { Container, Text, Input, Button, Heading } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import styles from '../styles/Home.module.scss'

export default function Home( {data} ) {
  
  const apiKey= process.env.API_KEY;
  const apiKeyHere = process.env.API_KEY_HERE;
  const [value, setValue] = React.useState("")
  const [weather, setWeather] = React.useState({});
  const [isLoading, setisLoading] = React.useState(false);
  const [dataFetching, setDataFetching] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);
  const [dataSuggestions, setDataSuggestions] = React.useState(false);

  const date = new Date();
  const hour = date.getHours();

  const getWeather = async() => {
    let input = document.getElementById('inputCity');
    if (input.value !== '') {
    setisLoading(true);
    const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&lang=fr&appid=${apiKey}`);
    const response = await apiCall.json();
    if (response) {
    setWeather(response);
    setisLoading(false);
    setDataFetching(true);
    console.log(weather);
    console.log(hour);
    }

    if(response.cod !== 200) {
      console.log('erreur');
      setDataFetching(false);
    }
  
    }
    if (input.value =='') {
      console.log('empty')
      }
  }

    const getAutocomplete = async() => {
      const apiCall = await fetch(`https://autocomplete.search.hereapi.com/v1/autocomplete?q=${value.replace(/ /g, '+')}&apiKey=${apiKeyHere}`);
      const response = await apiCall.json();
      if (response){
        setSuggestions(response.items);
        setDataSuggestions(true);
        console.log(suggestions);
        return <div>{suggestions}</div>
      }
    }

    const handleChange = (event) => {
      setValue(event.target.value);
      getAutocomplete();
      }
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    getWeather();
  }

  return (
    <Container
    height="100vh"
    textAlign="center"
    maxW="100%"
    className={styles.container}
    backgroundImage= {(hour > 20 || hour < 6) ? './images/night.png' : './images/day.png' }
    backgroundPosition="center"
    backgroundSize="cover"
    id="container"
    color= {(hour > 20 || hour < 6) ? '#fff' : '#000' }
    >
      <Head>
        <title>NextJS Weather App</title>
        <meta name="description" content="next js weather app" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC17h4ma5hmFKsnknJTAjgZ04VJCFpqpns&libraries=places"></script>
      </Head>

      <header>
      <div className={styles.header__bg}></div>
      <h1 className={styles.title}>Next JS Application Météo</h1>       
      </header>

      <main className={styles.main}>
      <h2 className={styles.subtitle}>Hey, quel temps fait-il aujourd'hui ? 😄</h2>
      {dataFetching && typeof weather.main != "undefined" && (
      <Weather {...weather} />
      )
      }
      <form onSubmit={handleSubmit} className={styles.form}>
        <Text mb="15px" fontSize="20px">Ville :</Text>
        <Input
          value={value}
          onChange={handleChange}
          placeholder="Ville"
          size="lg"
          maxW='70%'
          marginBottom= '1em'
          _placeholder={{ color: 'black' }}
          focusBorderColor= 'orange.400'
          id='inputCity'
        />
        <Button
        type="submit"
        marginTop='1em'
        >
        <SearchIcon color= '#000'/>
        </Button>
      </form>

      {isLoading && (
      <Loader />        
      )
      }
      
 </main>
      <footer>
      </footer>
    </Container>

  )
}

