import React, { useState } from "react";
import { useStats } from "../Context/StatContext";
import Translations from "../languages/Translation";
import { colors } from "../colors/colors";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SeriesList from '../pages/Series/SeriesList/SeriesList';
import ReqSeriesList from '../pages/Series/ReqSeriesList/ReqSeriesList';
import ActiveSeriesList from '../pages/Series/ActiveSeriesList/ActiveSeriesList';

function TopNavigator2() {

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
      <Tab.Screen name="SeriesList" component={SeriesList}
        options={
          {
            title: Translations[language].seriesTitle1,
          }
        } />
      <Tab.Screen name="ActiveSeriesList" component={ActiveSeriesList}
        options={
          {
            title: Translations[language].seriesTitle2,
          }
        } />
      <Tab.Screen name="ReqSeriesList" component={ReqSeriesList}
        options={
          {
            title: Translations[language].seriesTitle3,
          }
        } />
    </Tab.Navigator>
  );
}

export default TopNavigator2;
