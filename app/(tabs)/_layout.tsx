import {ActiveUserStateProp} from "@/state/activeUserSlice";
import displayText, {DisplayTextStateProp} from "@/state/displayLanguageSlice";
import {color} from "ansi-fragments";
import { Tabs } from 'expo-router';
import Icon from '@/views/components/Icon'
import {Colors} from '@/constants/Colors';
import {ReactNode} from "react";
import {useSelector} from "react-redux";

const baseTabOptions = {
  headerShown: false,
  tabBarActiveBackgroundColor: Colors.LIGHT_RED,
  tabBarInactiveBackgroundColor: Colors.DARK_RED,
  tabBarActiveTintColor: Colors.LIGHT_GREY,
  tabBarInactiveTintColor: Colors.LIGHT_GREY
};

export default function SpotCheckNavigationLayout(): ReactNode {
  const displayText = useSelector((state: DisplayTextStateProp) => state.displayText.displayTextJson);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 75,
          borderTopColor: Colors.GREY,
          borderTopWidth: 1,
          backgroundColor: Colors.DARK_RED
        },
        tabBarLabelStyle: {
          fontSize: 10
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          ...baseTabOptions,
          tabBarLabel: displayText.tabs.home,
          tabBarIcon: ({ color }) => <Icon size={24} name="home-sharp" color={color} />
        }}
      />
      <Tabs.Screen
        name="Spots"
        options={{
          ...baseTabOptions,
          tabBarLabel: displayText.tabs.spots,
          tabBarIcon: ({ color }) => <Icon size={24} name="at-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Crew"
        options={{
          ...baseTabOptions,
          tabBarLabel: displayText.tabs.crew,
          tabBarIcon: ({ color }) => <Icon size={24} name="people-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Setup"
        options={{
          ...baseTabOptions,
          tabBarLabel: displayText.tabs.setup,
          tabBarIcon: ({ color }) => <Icon size={24} name="settings" color={color} />,
        }}
      />
    </Tabs>
  );
}
