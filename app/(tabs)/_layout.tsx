import { Tabs } from 'expo-router';
import Icon from '@/views/components/Icon'
import {Colors} from '@/constants/Colors';
import {ReactNode} from "react";
import Index from "@/app/(tabs)/index";

const baseTabOptions = {
  headerShown: false,
  tabBarActiveBackgroundColor: Colors.LIGHT_RED,
  tabBarInactiveBackgroundColor: Colors.DARK_RED,
  tabBarActiveTintColor: Colors.LIGHT_GREY,
  tabBarInactiveTintColor: Colors.LIGHT_GREY
};

export default function SpotCheckNavigationLayout(): ReactNode {

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
          tabBarLabel: "HOME",
          tabBarIcon: ({ color }) => <Icon size={24} name="home-sharp" color={color} />
        }}
      />
      <Tabs.Screen
        name="SpotFinder"
        options={{
          ...baseTabOptions,
          tabBarLabel: "SPOTS",
          tabBarIcon: ({ color }) => <Icon size={24} name="at-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Crew"
        options={{
          ...baseTabOptions,
          tabBarLabel: "CREW",
          tabBarIcon: ({ color }) => <Icon size={24} name="people-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Setup"
        options={{
          ...baseTabOptions,
          tabBarLabel: "SETUP",
          tabBarIcon: ({ color }) => <Icon size={24} name="settings" color={color} />,
        }}
      />
    </Tabs>
  );
}
