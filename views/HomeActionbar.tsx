import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import {router} from "expo-router";
import React, {ReactNode} from "react";
import {Pressable, StyleSheet, View} from "react-native";

export default function HomeActionbar(): ReactNode {
  const navigateToCreateNewClip = () => {
    router.navigate("/footage/CreateNewClip");
  }

  return (
    <View style={styles.actionBar}>
      <Pressable
        onPress={navigateToCreateNewClip}
        style={styles.notificationWrapper}
      >
        <Icon size={26} name={"add-circle-sharp"} color={Colors.WHITE} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actionBar: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.LIGHT_RED,
    borderTopColor: Colors.PALE_RED,
    borderTopWidth: 1
  },
  notificationWrapper: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
