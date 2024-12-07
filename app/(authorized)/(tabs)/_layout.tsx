import { Tabs } from 'expo-router';
import Icon from '@/views/components/Icon'
import {Colors} from '@/constants/Colors';
import {ReactNode} from "react";

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
          tabBarIcon: ({ focused, color }) => <Icon size={24} name={focused ? "home-sharp" : "home-outline"} color={color} />
        }}
      />
      <Tabs.Screen
        name="Spots"
        options={{
          ...baseTabOptions,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => <Icon size={24} name={focused ? "at-circle-sharp" : "at-circle-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Friends"
        options={{
          ...baseTabOptions,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => <Icon size={24} name={focused ? "person" : "person-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Crew"
        options={{
          ...baseTabOptions,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => <Icon size={24} name={focused ? "people-circle-sharp" : "people-circle-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Setup"
        options={{
          ...baseTabOptions,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => <Icon size={24} name={focused ? "construct-sharp" : "construct-outline"} color={color} />,
        }}
      />
    </Tabs>
  );
}
