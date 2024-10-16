import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import {ReactNode} from "react";
import {GestureResponderEvent, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";

interface IModalTopBar {
  children: ReactNode | ReactNode[]
  onTapCloseModal: (e: GestureResponderEvent) => void
  nameToShow: string
}

export default function CommonModalContentWrapper({
  children,
  onTapCloseModal,
  nameToShow
}: IModalTopBar):ReactNode {
  return (
    <SafeAreaView style={styles.mapWrapper}>
      <View style={styles.topBar}>
        <Text style={styles.topBarName}>{nameToShow}</Text>
        <Pressable
          onPress={onTapCloseModal}>
          <Icon size={30} name="close-circle-outline" color={Colors.WHITE} />
        </Pressable>
      </View>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mapWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.BLACK
  },
  topBar: {
    height: 50,
    backgroundColor: Colors.DARK_GREY,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  topBarName: {
    color: Colors.WHITE,
    fontSize: 18
  }
});
