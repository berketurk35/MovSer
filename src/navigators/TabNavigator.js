import React from "react";
import { StyleSheet } from "react-native";
import { useStats } from "../Context/StatContext";
import Translations from "../languages/Translation";

import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import TopNavigator from "./TopNavigator";
import TopNavigator2 from "./TopNavigator2";
import TopNavigator3 from "./TopNavigator3";
import TopNavigator4 from "./TopNavigator4";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Iconx from "react-native-vector-icons/MaterialIcons";
import { colors } from "../colors/colors";

const DefaultTheme = {
    "colors": {
        "secondaryContainer": "white",
    }
}

function TabNavigator() {

    const Tab = createMaterialBottomTabNavigator();
    const { language, setLanguage } = useStats();

    return (
        <Tab.Navigator
            theme={DefaultTheme}
            activeColor="white"
            inactiveColor="white"
            barStyle={styles.tabBar}
        >
            <Tab.Screen name="TopNavigator" component={TopNavigator}
                options={
                    {
                        tabBarIcon: ({ color, size }) => (<Icon name="movie-open" size={22} color={"black"} />),
                        title: Translations[language].movies,
                    }
                } />
            <Tab.Screen name="TopNavigator2" component={TopNavigator2}
                options={
                    {
                        tabBarIcon: ({ color, size }) => (<Iconx name="connected-tv" size={22} color={"black"} />),
                        title: Translations[language].series,
                    }
                } />
            <Tab.Screen name="TopNavigator3" component={TopNavigator3}
                options={
                    {
                        tabBarIcon: ({ color, size }) => (<Iconx name="list-alt" size={22} color={"black"} />),
                        title: Translations[language].lists,
                    }
                } />
            <Tab.Screen name="TopNavigator4" component={TopNavigator4}
                options={
                    {
                        tabBarIcon: ({ color, size }) => (<Iconx name="self-improvement" size={22} color={"black"} />),
                        title: Translations[language].profile,
                    }
                } />
        </Tab.Navigator>
    )
};

const styles = StyleSheet.create({
    tabBar: {
        height: 80,
        backgroundColor: colors.primary,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: 'hidden',
    },
})

export default TabNavigator;

