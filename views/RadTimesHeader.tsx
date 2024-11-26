import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import React, {ReactNode} from "react";
import {Image, Pressable, StyleSheet, View} from "react-native";

export default function RadTimesHeader(): ReactNode {
  const loadNotifications = () => {
    console.log("notifications");
  }

  return (
    <View style={styles.appHeader}>
      <View style={styles.logo}>
        <Image
          source={require('@/assets/images/rad-times-title.png')}
        />
      </View>
      <Pressable
        onPress={loadNotifications}
        style={styles.notificationWrapper}
      >
        <Icon size={26} name={"notifications-sharp"} color={Colors.WHITE} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  appHeader: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.DARK_RED
  },
  logo: {
    paddingLeft: 30,
    height: 30,
    width: 120,
    alignItems: "center",
    justifyContent: "center"
  },
  notificationWrapper: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
