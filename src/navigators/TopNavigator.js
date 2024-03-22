import React, { useState } from "react";
import { useStats } from "../Context/StatContext";
import Translations from "../languages/Translation";
import { colors } from "../colors/colors";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MoviesList from '../pages/Movies/MoviesList/MoviesList';
import ReqMoviesList from '../pages/Movies/ReqMoviesList/ReqMoviesList';

function TopNavigator() {

  const Tab = createMaterialTopTabNavigator();
  const { language, setLanguage } = useStats();

  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: colors.primary,
      },
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "white",
      tabBarLabelStyle: {
        textTransform: "capitalize",
        fontSize: 13,
        fontWeight: "bold",
      },
      tabBarIndicatorStyle: {
        backgroundColor: "black",
        height: 3,
      }

    }}>
      <Tab.Screen name="MoviesList" component={MoviesList}
        options={
          {
            title: Translations[language].moviesTitle1,
          }
        } />
      <Tab.Screen name="ReqMoviesList" component={ReqMoviesList}
        options={
          {
            title: Translations[language].moviesTitle2,
          }
        } />
    </Tab.Navigator>
  );
}

export default TopNavigator;

