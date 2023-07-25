import React from "react";

import { createMaterialBottomTabNavigator  } from '@react-navigation/material-bottom-tabs';

import TopNavigator from "./TopNavigator";
import TopNavigator2 from "./TopNavigator2";
import TopNavigator3 from "./TopNavigator3";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Iconx from "react-native-vector-icons/MaterialIcons";

function TabNavigator() {

    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator >
            <Tab.Screen name="TopNavigator" component={TopNavigator} 
                options={
                    {
                        tabBarIcon: ({ color, size }) => (<Icon name="movie-open" size={20} color={"black"} />),
                        title: "Movies",
                    }
                } />
            <Tab.Screen name="TopNavigator2" component={TopNavigator2}
                options={
                    {
                        tabBarIcon: ({ color, size }) => (<Iconx name="connected-tv" size={20} color={"black"} />),
                        title: "Series",
                    }
                } />
                <Tab.Screen name="TopNavigator3" component={TopNavigator3}
                options={
                    {
                        tabBarIcon: ({ color, size }) => (<Iconx name="list-alt" size={20} color={"black"} />),
                        title: "Lists",
                    }
                } />
        </Tab.Navigator>
    )
};

export default TabNavigator;

