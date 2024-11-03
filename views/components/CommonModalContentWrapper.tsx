import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import {ReactNode} from "react";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {GestureResponderEvent, Pressable, StyleSheet, Text, View} from "react-native";

interface IModalTopBar {
  children: ReactNode | ReactNode[]
  onTapCloseModal: (e: GestureResponderEvent) => void
  nameToShow: string,
  topBarShown?: boolean
}

export default function CommonModalContentWrapper({
  children,
  onTapCloseModal,
  nameToShow,
  topBarShown = true
}: IModalTopBar):ReactNode {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mapWrapper}>
        {topBarShown &&
            <View style={styles.topBar}>
                <Text style={styles.topBarName}>{nameToShow}</Text>
                <Pressable
                    onPress={onTapCloseModal}>
                    <Icon size={30} name="close-circle-outline" color={Colors.WHITE} />
                </Pressable>
            </View>
        }
        {!topBarShown &&
            <View style={styles.topBarInvisible}>
                <Pressable
                    style={styles.topBarInvisibleClose}
                    onPress={onTapCloseModal}
                >
                    <Icon size={40} name="close-circle-outline" color={Colors.WHITE} />
                </Pressable>
            </View>
        }
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
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
  },
  topBarInvisible: {
    height: 50,
    width: '100%',
    position: 'absolute',
    top: 70,
    left: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 1
  },
  topBarInvisibleClose: {
    height: 50,
    width: 50
  }
});
