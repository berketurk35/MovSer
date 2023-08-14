import React, { useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MoviesList from '../pages/Movies/MoviesList/MoviesList';
import ReqMoviesList from '../pages/Movies/ReqMoviesList/ReqMoviesList';

import Translations from '../languages/Translation';

function TopNavigator() {

  const Tab = createMaterialTopTabNavigator();

  const [language, setLanguage] = useState("en");

  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "gray",
      tabBarLabelStyle: {
        textTransform: "capitalize",
        fontSize: 14,
        fontWeight: "bold",
      },
      tabBarIndicatorStyle : {
        backgroundColor: "black"
      }

    }}>
      <Tab.Screen name="MoviesList" component={MoviesList}
        options={
          {
            title: "Watched Films",
          }
        } />
      <Tab.Screen name="ReqMoviesList" component={ReqMoviesList}
        options={
          {
            title: "Movies to Watch",
          }
        } />
    </Tab.Navigator>
  );
}

export default TopNavigator;

