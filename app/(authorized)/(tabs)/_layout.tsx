import {DisplayTextStateProp} from "@/state/displayLanguageSlice";
import { Tabs } from 'expo-router';
import Icon from '@/views/components/Icon'
import {Colors} from '@/constants/Colors';
import {ReactNode} from "react";
import {useSelector} from "react-redux";

const baseTabOptions = {
  headerShown: false,
  tabBarInactiveBackgroundColor: Colors.DARK_RED,
  tabBarActiveTintColor: Colors.WHITE,
  tabBarInactiveTintColor: Colors.MEDIUM_LIGHT_GRAY
};

export default function RadTimesNavigationLayout(): ReactNode {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 40,
          borderTopColor: Colors.BLACK,
          borderTopWidth: 1,
          backgroundColor: Colors.DARK_RED
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          ...baseTabOptions,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Icon size={24} name="home-sharp" color={color} />
        }}
      />
      <Tabs.Screen
        name="Spots"
        options={{
          ...baseTabOptions,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Icon size={24} name="at-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Crew"
        options={{
          ...baseTabOptions,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Icon size={24} name="people-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Setup"
        options={{
          ...baseTabOptions,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Icon size={24} name="settings" color={color} />,
        }}
      />
    </Tabs>
  );
}
