import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useStats } from "../Context/StatContext";
import Translations from "../languages/Translation";
import ProfileInfo from '../pages/Profile/ProfileInfo/ProfileInfo';
import Friends from '../pages/Profile/Friends/Friends';

function TopNavigator4() {

  const Tab = createMaterialTopTabNavigator();
  const { language, setLanguage } = useStats();

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
            title: Translations[language].profileTitle1,
          }
        } />
        <Tab.Screen name="Friends" component={Friends}
        options={
          {
            title: Translations[language].profileTitle2,
          }
        } />
    </Tab.Navigator>
  );
}

export default TopNavigator4;
