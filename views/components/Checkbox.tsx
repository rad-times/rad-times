import {Colors} from "@/constants/Colors";
import {ReactNode} from "react";
import ExpoCheckbox from 'expo-checkbox';
import {GestureResponderEvent, Pressable, StyleSheet, Text, View} from 'react-native';

interface ICheckbox {
  isChecked: boolean
  onCheck: (arg0: boolean) => void
  label: string
}

export default function Checkbox({
  isChecked,
  onCheck,
  label
}: ICheckbox):ReactNode {

  const toggleCheckbox = () => {
   onCheck(!isChecked);
  };

  return (
    <View
      style={styles.checkBoxWrapper}
    >
      <ExpoCheckbox
        value={isChecked}
        onValueChange={(checked) => onCheck(checked)}
        color={isChecked ? Colors.LIGHT_RED : undefined}
      />
      <Pressable
        style={styles.pressableText}
        onPress={toggleCheckbox}
      >
        <Text style={styles.checkboxLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  checkBoxWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 15,
  },
  checkboxLabel: {
    fontSize: 16,
    color: Colors.WHITE,
    paddingLeft: 10
  },
  pressableText: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30
  }
});
