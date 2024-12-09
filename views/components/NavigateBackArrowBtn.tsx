import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import {router} from "expo-router";
import React, {ReactNode} from "react";
import {Pressable} from "react-native";

export default function NavigateBackArrowBtn(): ReactNode {
  return (
    <Pressable
      onPress={() => {
        router.back();
      }}
    >
      <Icon size={50} name="arrow-back-circle-sharp" color={Colors.WHITE} />
    </Pressable>
  );
}
