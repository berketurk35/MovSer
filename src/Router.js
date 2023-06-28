import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./navigators/TabNavigator";
import TopNavigator from "./navigators/TopNavigator";
import TopNavigator2 from "./navigators/TopNavigator2";
import MoviesList from "./pages/MoviesList/MoviesList";
import SeriesList from "./pages/SeriesList/SeriesList";
import ReqMoviesList from "./pages/ReqMoviesList/ReqMoviesList";
import ReqSeriesList from "./pages/ReqSeriesList/ReqSeriesList";
import MyLists from "./pages/MyLists/MyLists";
import ActiveSeriesList from "./pages/ActiveSeriesList/ActiveSeriesList";

const Stack = createNativeStackNavigator();

function Router() {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontSize: 16,
                    fontWeight: "bold",
                },
                headerStyle: {
                    backgroundColor: "pink",
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

                <Stack.Screen name="MyLists" component={MyLists} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router;
