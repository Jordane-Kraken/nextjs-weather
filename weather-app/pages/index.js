import React from "react";
import Head from "next/head";
import Loader from "../components/Loader";
import Weather from "../components/Weather";
import Error from "../components/Error";
import { Container, Text, InputGroup, Input } from "@chakra-ui/react";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const moment = require("moment");
  require("moment/locale/fr");
  const date = moment().locale("fr").format("dddd DD-MM-YYYY");

  var today = new Date();
  let hourUser = today.getHours();

  const [weather, setWeather] = React.useState({});
  const [isLoading, setisLoading] = React.useState(false);
  const [dataFetching, setDataFetching] = React.useState(false);
  const [suggestionsList, setSuggestionsList] = React.useState([]);
  const [dataSuggestions, setDataSuggestions] = React.useState(false);
  const [cityName, setCityName] = React.useState();
  const [error, setError] = React.useState(false);
  const [hour, setHour] = React.useState(hourUser);

  let API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  let API_KEY_HERE = process.env.NEXT_PUBLIC_API_KEY_HERE;

  const getWeather = async (city) => {
    setCityName(city);
    let input = document.getElementById("inputCity");
    if (input.value !== "") {
      setisLoading(true);
      const apiCall = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`
      );
      const response = await apiCall.json();
      if (response) {
        setWeather(response);
        setisLoading(false);
        setDataFetching(true);
        setError(false);
      }

      if (response.cod !== 200) {
        setError(true);
        setDataFetching(false);
      }
    }
  };

  const getAutocomplete = async () => {
    let input = document.getElementById("inputCity");
    if (input.value !== "") {
      setDataSuggestions(false);
      const apiCall = await fetch(
        `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${cityName}&apiKey=${API_KEY_HERE}`
      );
      const response = await apiCall.json();

      if (response.items) {
        setDataSuggestions(true);
        setSuggestionsList(response.items);
      } else {
        setDataSuggestions(false);
      }
    }
  };

  const handleChange = () => {
    setCityName(event.target.value);
    getAutocomplete();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <Container
      minHeight="100vh"
      textAlign="center"
      maxW="100%"
      className={styles.container}
      backgroundImage={
        hour > 6 && hour < 20 ? "./images/day1.jpeg" : "./images/night1.jpeg"
      }
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      id="container"
      color={hour > 6 && hour < 20 ? "#000" : "#fff"}
    >
      <Head>
        <title>NextJS Application Météo</title>
        <meta name="description" content="NextJS Application Météo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className={styles.header__bg}></div>
        <h1 className={styles.title}>Next JS Application Météo</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.paragraph}>📅 Nous sommes le {date}</div>
        <h2 className={styles.subtitle}>
          Hey, quel temps fait-il aujourd'hui ? 😄
        </h2>
        {error && <Error />}

        {isLoading && <Loader className={styles.loader} />}

        {dataFetching && typeof weather.main != "undefined" && (
          <Weather {...weather} />
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
          <Text mb="1em" mt="1em" fontSize="1.7em">
            Ville :
          </Text>
          <InputGroup size="lg" maxW="65%" margin="auto">
            <Input
              value={cityName}
              onChange={handleChange}
              placeholder="Ville"
              size="lg"
              marginBottom="1em"
              _placeholder={{ color: hour > 6 && hour < 20 ? "#000" : "#fff" }}
              focusBorderColor="orange.400"
              id="inputCity"
              isRequired
            />
          </InputGroup>
          {suggestionsList && (
            <UnorderedList>
              {suggestionsList.map((suggestion) => (
                <ListItem
                  className={styles.listItem}
                  color="#000"
                  listStyleType="none"
                  key={suggestion.id}
                  onClick={() => {
                    getWeather(suggestion.address.city);
                  }}
                >
                  {suggestion.title}
                </ListItem>
              ))}
            </UnorderedList>
          )}
        </form>
      </main>
    </Container>
  );
}
