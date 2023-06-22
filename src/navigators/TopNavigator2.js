import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SeriesList from '../pages/SeriesList/SeriesList';
import ReqSeriesList from '../pages/ReqSeriesList/ReqSeriesList';

function TopNavigator2() {

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
      <Tab.Screen name="SeriesList" component={SeriesList}
        options={
          {
            title: "İzlediklerim",
          }
        } />
      <Tab.Screen name="ReqSeriesList" component={ReqSeriesList}
        options={
          {
            title: "İzlemek İstediklerim",
          }
        } />
    </Tab.Navigator>
  );
}

export default TopNavigator2;
