import React from "react";
import { Box, Heading, Text } from '@chakra-ui/react'
import styles from '../styles/Home.module.scss';
  
  export default function Weather( {weather, main, name, wind } ) {

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return(
      <div className={styles.box}>
          <h3 className={styles.headingCard}>
          📍 {name}
          </h3>
          <img src={`https://openweathermap.org/img/w/${weather[0].icon}.png`} className={styles.icon}/>
          <p className={styles.subHeadingCard}>
        {capitalizeFirstLetter(weather[0].description)}
          </p>
          
      <div className={styles.card}>    
        <Text
          mt="1"
          lineHeight="tight"
          isTruncated
          fontSize="xl"
        >
        🌡️ Température : {Math.trunc(main.temp)}°C
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
        </div>
    );
  }



