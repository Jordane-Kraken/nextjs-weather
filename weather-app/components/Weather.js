import React from "react";
import { Flex, Heading, Text } from '@chakra-ui/react'
import styles from '../styles/Home.module.scss';
  
  export default function Weather( {weather, main, name } ) {

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return(

      <Flex direction='column' >
          <Heading as="h3" size="md">
          📍 {name}
          <img src={`https://openweathermap.org/img/w/${weather[0].icon}.png`} className={styles.icon}/>
          </Heading>
          <Text
            letterSpacing="wide"
            fontSize="xl"
            ml="2"
          >
        {capitalizeFirstLetter(weather[0].description)}

          </Text>
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
      </Flex>

    );
  }



