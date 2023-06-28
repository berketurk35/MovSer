import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SeriesList from '../pages/SeriesList/SeriesList';
import ReqSeriesList from '../pages/ReqSeriesList/ReqSeriesList';
import ActiveSeriesList from '../pages/ActiveSeriesList/ActiveSeriesList';

function TopNavigator2() {

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator screenOptions={
      {
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "black"
        }

      }
    }>
      <Tab.Screen name="SeriesList" component={SeriesList}
        options={
          {
            title: "İzlediğim Dizilerim",
          }
        } />
        <Tab.Screen name="ActiveSeriesList" component={ActiveSeriesList}
        options={
          {
            title: "Aktif Dizilerim",
          }
        } />
      <Tab.Screen name="ReqSeriesList" component={ReqSeriesList}
        options={
          {
            title: "İstek Dizilerim",
          }
        } />
    </Tab.Navigator>
  );
}

export default TopNavigator2;
