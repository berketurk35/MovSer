import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MyMoviesList from "../pages/MyLists/MyMoviesList/MyMovieList";
import MySeriesList from "../pages/MyLists/MySeriesList/MySeriesList";

function TopNavigator3() {

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator screenOptions={
      {
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontSize: 14,
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "black"
        }

      }
    }>
      <Tab.Screen name="MyMoviesList" component={MyMoviesList}
        options={
          {
            title: "Movies List",
          }
        } />
        <Tab.Screen name="MySeriesList" component={MySeriesList}
        options={
          {
            title: "Series List",
          }
        } />
    </Tab.Navigator>
  );
}

export default TopNavigator3;
