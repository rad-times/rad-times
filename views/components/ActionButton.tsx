import {Colors} from "@/constants/Colors";
import {GestureResponderEvent, Pressable, StyleSheet, Text} from 'react-native';
import {ReactNode} from "react";

interface ActionButtonProps {
  btnDisabled?: boolean,
  onClickBtn: (e: GestureResponderEvent) => void
  btnDisplayText: string
}
export default function ActionButton(
  {
    btnDisabled = false,
    onClickBtn,
    btnDisplayText
}: ActionButtonProps): ReactNode {
  return (
    <Pressable
      onPress={onClickBtn}
      disabled={btnDisabled}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? Colors.LIGHT_GREY : Colors.WHITE,
        },
        styles.button
      ]}
    >
      <Text style={styles.buttonText}>{btnDisplayText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 25
  },
  buttonText: {
    color: Colors.DARK_GREY,
    fontSize: 18,
    paddingLeft: 30,
    paddingRight: 30
  }
})
