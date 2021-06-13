import React from "react";
import { Flex, Heading, Text } from '@chakra-ui/react'
import styles from '../styles/Home.module.scss';
  
  export default function Weather( {weather, main, name, wind } ) {

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return(
      <>
          <Heading as="h3" size="xl">
          📍 {name}
          <img src={`https://openweathermap.org/img/w/${weather[0].icon}.png`} className={styles.icon}/>
          <Text
            letterSpacing="wide"
            fontSize="xl"
            m="2"
          >
        {capitalizeFirstLetter(weather[0].description)}
          </Text>
          </Heading>
      <div className={styles.card}>    
        <Text
          mt="1"
          lineHeight="tight"
          isTruncated
          fontSize="xl"
        >
        🌡️ Température : <b>{Math.trunc(main.temp)}°C</b>
        </Text>
        <Text
          mt="1"
          lineHeight="tight"
          isTruncated
          fontSize="xl"
        >
        💧 Humidité : {main.humidity}%
        </Text>
        <Text
          mt="1"
          lineHeight="tight"
          isTruncated
          fontSize="xl"
        >
        💨 Vent : {Math.trunc(wind.speed)}km/h
        </Text>
        </div>
        </>
      

    );
  }



