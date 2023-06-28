import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MoviesList from '../pages/MoviesList/MoviesList';
import ReqMoviesList from '../pages/ReqMoviesList/ReqMoviesList';

function TopNavigator() {

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "gray",
      tabBarLabelStyle: {
        textTransform: "capitalize",
        fontSize: 14,
        fontWeight: "bold",
      },
      tabBarIndicatorStyle : {
        backgroundColor: "black"
      }

    }}>
      <Tab.Screen name="MoviesList" component={MoviesList}
        options={
          {
            title: "İzlediğim Filmlerim",
          }
        } />
      <Tab.Screen name="ReqMoviesList" component={ReqMoviesList}
        options={
          {
            title: "İstek Filmlerim",
          }
        } />
    </Tab.Navigator>
  );
}

export default TopNavigator;

