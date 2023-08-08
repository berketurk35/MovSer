import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./navigators/TabNavigator";
import TopNavigator from "./navigators/TopNavigator";
import TopNavigator2 from "./navigators/TopNavigator2";
import TopNavigator3 from "./navigators/TopNavigator3";

import MoviesList from "./pages/Movies/MoviesList/MoviesList";
import ReqMoviesList from "./pages/Movies/ReqMoviesList/ReqMoviesList";

import SeriesList from "./pages/Series/SeriesList/SeriesList";
import ActiveSeriesList from "./pages/Series/ActiveSeriesList/ActiveSeriesList";
import ReqSeriesList from "./pages/Series/ReqSeriesList/ReqSeriesList";

import MyMovieList from "./pages/MyLists/MyMoviesList/MyMovieList";
import MySeriesList from "./pages/MyLists/MySeriesList/MySeriesList";

import MovieListDetails from "./pages/MyLists/ListDetails/MovieListDetails/MovieListDetails";
import SerieListDetails from "./pages/MyLists/ListDetails/SerieListDetails/SerieListDetails";

import { StatProvider } from "./Context/StatContext";

import Test from "./pages/Test";
import ListeTesti from "./pages/ListeTesti";

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

                    <Stack.Screen name="Test" component={Test} />
                    <Stack.Screen name="ListeTesti" component={ListeTesti} />

                </Stack.Navigator>
            </NavigationContainer>
        </StatProvider>
    )
}

export default Router;
