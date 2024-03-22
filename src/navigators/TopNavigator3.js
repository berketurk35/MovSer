import React, { useState } from "react";
import { useStats } from "../Context/StatContext";
import Translations from "../languages/Translation";
import { colors } from "../colors/colors";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MyMoviesList from "../pages/MyLists/MyMoviesList/MyMovieList";
import MySeriesList from "../pages/MyLists/MySeriesList/MySeriesList";
import MyFriendsList from '../pages/MyLists/MyFriendsList/MyFriendsList';

function TopNavigator3() {

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
        fontSize: 12,
        fontWeight: "bold",
      },
      tabBarIndicatorStyle: {
        backgroundColor: "black",
        height: 3,
      }

    }}>
      <Tab.Screen name="MyMoviesList" component={MyMoviesList}
        options={
          {
            title: Translations[language].listTitle1,
          }
        } />
      <Tab.Screen name="MySeriesList" component={MySeriesList}
        options={
          {
            title: Translations[language].listTitle2,
          }
        } />
      <Tab.Screen name="MyFriendsList" component={MyFriendsList}
        options={
          {
            title: Translations[language].listTitle3,
          }
        } />
    </Tab.Navigator>
  );
}

export default TopNavigator3;
