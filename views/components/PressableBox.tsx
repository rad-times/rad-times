import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import {GestureResponderEvent, Pressable, StyleSheet, View} from 'react-native';
import {ReactNode} from "react";

interface IPressableBox {
  boxDisabled?: boolean,
  onSelectBox: (e: GestureResponderEvent) => void
  children: ReactNode|ReactNode[]
}
export default function PressableBox(
  {
    boxDisabled = false,
    onSelectBox,
    children
  }: IPressableBox): ReactNode {
  return (
    <Pressable
      onPress={onSelectBox}
      style={styles.box}
      disabled={boxDisabled}
    >
      <View>
        {children}
      </View>
      <Icon size={24} name="chevron-forward-circle-outline" color={Colors.DARK_GREY} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: 5,
    borderColor: Colors.WHITE,
    borderWidth: 2,
    height: 50
  }
})
