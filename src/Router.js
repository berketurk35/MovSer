import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./navigators/TabNavigator";
import TopNavigator from "./navigators/TopNavigator";
import TopNavigator2 from "./navigators/TopNavigator2";
import TopNavigator3 from "./navigators/TopNavigator3";
import TopNavigator4 from "./navigators/TopNavigator4";


import MovieListDetails from "./pages/MyLists/ListDetails/MovieListDetails/MovieListDetails";
import SerieListDetails from "./pages/MyLists/ListDetails/SerieListDetails/SerieListDetails";
import FriendListDetails from "./pages/MyLists/ListDetails/FriendListDetails/FriendListDetails";
import FriendListDetails2 from "./pages/MyLists/ListDetails/FriendListDetails2/FriendListDetails2";

import Intro from "./pages/Intro/Intro";
import Login from "./pages/Login/Login";
import MailP from "./pages/MailP/MailP";
import Register from "./pages/Register/Register";

import { StatProvider } from "./Context/StatContext";

const Stack = createNativeStackNavigator();

function Router() {
    return (
        <StatProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false,
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 16,
                        fontWeight: "bold",
                    },
                    headerStyle: {
                        backgroundColor: "white",
                    },
                }} >
                    <Stack.Screen name="Intro" component={Intro} />

                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="MailP" component={MailP} />
                    <Stack.Screen name="Register" component={Register} />

                    <Stack.Screen name="TabNavigator" component={TabNavigator} />

                    <Stack.Screen name="TopNavigator" component={TopNavigator} />
                    <Stack.Screen name="TopNavigator2" component={TopNavigator2} />
                    <Stack.Screen name="TopNavigator3" component={TopNavigator3} />
                    
                    <Stack.Screen name="MovieListDetails" component={MovieListDetails} />
                    <Stack.Screen name="SerieListDetails" component={SerieListDetails} />
                    <Stack.Screen name="FriendListDetails" component={FriendListDetails} />
                    <Stack.Screen name="FriendListDetails2" component={FriendListDetails2} />

                    <Stack.Screen name="TopNavigator4" component={TopNavigator4} />

                </Stack.Navigator>
            </NavigationContainer>
        </StatProvider>
    )
}

export default Router;
