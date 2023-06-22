import React from "react";

import { createMaterialBottomTabNavigator  } from '@react-navigation/material-bottom-tabs';

import TopNavigator from "./TopNavigator";
import TopNavigator2 from "./TopNavigator2";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Iconx from "react-native-vector-icons/MaterialIcons";

function TabNavigator() {

    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="TopNavigator" component={TopNavigator}
                options={
                    {
                        tabBarIcon: ({ color, size }) => (<Icon name="movie-open" size={20} color={"black"} />),
                        title: "Filmlerim",
                        headerShown: false,
                    }
                } />
            <Tab.Screen name="TopNavigator2" component={TopNavigator2}
                options={
                    {
                        tabBarIcon: ({ color, size }) => (<Iconx name="connected-tv" size={20} color={"black"} />),
                        title: "Dizilerim",
                        headerShown: false,
                    }
                } />
        </Tab.Navigator>
    )
};

export default TabNavigator;

