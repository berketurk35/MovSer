import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MoviesList from '../pages/MoviesList/MoviesList';
import ReqMoviesList from '../pages/ReqMoviesList/ReqMoviesList';

function TopNavigator() {

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator screenOptions={
      {
        tabBarLabelStyle: {
          color: "black",
          fontSize: 12,
          fontWeight: "bold",
        },
      }
    }>
      <Tab.Screen name="MoviesList" component={MoviesList}
        options={
          {
            title: "İzlediklerim",
          }
        } />
      <Tab.Screen name="ReqMoviesList" component={ReqMoviesList}
        options={
          {
            title: "İzlemek İstediklerim",
          }
        } />
    </Tab.Navigator>
  );
}

export default TopNavigator;

