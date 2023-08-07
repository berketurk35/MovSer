import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProfileInfo from '../pages/Profile/ProfileInfo/ProfileInfo';
import Friends from '../pages/Profile/Friends/Friends';

function TopNavigator4() {

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
      <Tab.Screen name="ProfileInfo" component={ProfileInfo}
        options={
          {
            title: "Profile Information",
          }
        } />
        <Tab.Screen name="Friends" component={Friends}
        options={
          {
            title: "Friends",
          }
        } />
    </Tab.Navigator>
  );
}

export default TopNavigator4;
