import React, { useState } from "react";
import { useStats } from "../Context/StatContext";
import Translations from "../languages/Translation";
import { colors } from "../colors/colors";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProfileInfo from '../pages/Profile/ProfileInfo/ProfileInfo';
import Friends from '../pages/Profile/Friends/Friends';

function TopNavigator4() {

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
      <Tab.Screen name="ProfileInfo" component={ProfileInfo}
        options={
          {
            title: Translations[language].profileTitle1,
          }
        } />
      <Tab.Screen name="Friends" component={Friends}
        options={
          {
            title: Translations[language].profileTitle2,
          }
        } />
    </Tab.Navigator>
  );
}

export default TopNavigator4;
