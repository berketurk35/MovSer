import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./navigators/TabNavigator";
import TopNavigator from "./navigators/TopNavigator";
import TopNavigator2 from "./navigators/TopNavigator2";
import TopNavigator3 from "./navigators/TopNavigator3";
import TopNavigator4 from "./navigators/TopNavigator4";

import MoviesList from "./pages/Movies/MoviesList/MoviesList";
import ReqMoviesList from "./pages/Movies/ReqMoviesList/ReqMoviesList";

import SeriesList from "./pages/Series/SeriesList/SeriesList";
import ActiveSeriesList from "./pages/Series/ActiveSeriesList/ActiveSeriesList";
import ReqSeriesList from "./pages/Series/ReqSeriesList/ReqSeriesList";

import MyMovieList from "./pages/MyLists/MyMoviesList/MyMovieList";
import MySeriesList from "./pages/MyLists/MySeriesList/MySeriesList";

import MovieListDetails from "./pages/MyLists/ListDetails/MovieListDetails/MovieListDetails";
import SerieListDetails from "./pages/MyLists/ListDetails/SerieListDetails/SerieListDetails";

import ProfileInfo from "./pages/Profile/ProfileInfo/ProfileInfo";
import Friends from "./pages/Profile/Friends/Friends";

import Intro from "./pages/Intro/Intro";
import Login from "./pages/Login/Login";

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

                    <Stack.Screen name="TabNavigator" component={TabNavigator} />

                    <Stack.Screen name="TopNavigator" component={TopNavigator} />
                    <Stack.Screen name="MoviesList" component={MoviesList} />
                    <Stack.Screen name="ReqMoviesList" component={ReqMoviesList} />

                    <Stack.Screen name="TopNavigator2" component={TopNavigator2} />
                    <Stack.Screen name="SeriesList" component={SeriesList} />
                    <Stack.Screen name="ReqSeriesList" component={ReqSeriesList} />
                    <Stack.Screen name="ActiveSeriesList" component={ActiveSeriesList} />

                    <Stack.Screen name="TopNavigator3" component={TopNavigator3} />
                    <Stack.Screen name="MyMovieList" component={MyMovieList} />
                    <Stack.Screen name="MySeriesList" component={MySeriesList} />

                    <Stack.Screen name="MovieListDetails" component={MovieListDetails} />
                    <Stack.Screen name="SerieListDetails" component={SerieListDetails} />

                    <Stack.Screen name="TopNavigator4" component={TopNavigator4} />
                    <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
                    <Stack.Screen name="Friends" component={Friends} />

                    <Stack.Screen name="Login" component={Login} />

                </Stack.Navigator>
            </NavigationContainer>
        </StatProvider>
    )
}

export default Router;
