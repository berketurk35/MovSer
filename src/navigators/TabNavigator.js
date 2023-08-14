import React from "react";
import { useStats } from "../Context/StatContext";
import Translations from "../languages/Translation";

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import TopNavigator from "./TopNavigator";
import TopNavigator2 from "./TopNavigator2";
import TopNavigator3 from "./TopNavigator3";
import TopNavigator4 from "./TopNavigator4";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Iconx from "react-native-vector-icons/MaterialIcons";

function TabNavigator() {

    const Tab = createMaterialBottomTabNavigator();
    const { language, setLanguage } = useStats();

    return (
        <Tab.Navigator >
            <Tab.Screen name="TopNavigator" component={TopNavigator}
                options={
                    {
                        tabBarIcon: ({ color, size }) => (<Icon name="movie-open" size={20} color={"black"} />),
                        title: Translations[language].movies,
                    }
                } />
            <Tab.Screen name="TopNavigator2" component={TopNavigator2}
                options={
                    {
                        tabBarIcon: ({ color, size }) => (<Iconx name="connected-tv" size={20} color={"black"} />),
                        title: Translations[language].series,
                    }
                } />
            <Tab.Screen name="TopNavigator3" component={TopNavigator3}
                options={
                    {
                        tabBarIcon: ({ color, size }) => (<Iconx name="list-alt" size={20} color={"black"} />),
                        title: Translations[language].lists,
                    }
                } />
            <Tab.Screen name="TopNavigator4" component={TopNavigator4}
                options={
                    {
                        tabBarIcon: ({ color, size }) => (<Iconx name="self-improvement" size={20} color={"black"} />),
                        title: Translations[language].profile,
                    }
                } />
        </Tab.Navigator>
    )
};

export default TabNavigator;

