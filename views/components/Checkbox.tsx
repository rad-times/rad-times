import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import {ReactNode} from "react";
import {GestureResponderEvent, Pressable, StyleSheet, Text, View} from 'react-native';

interface ICheckbox {
  isChecked: boolean
  onCheck: (e: GestureResponderEvent) => void
  label: string
}

export default function Checkbox({
  isChecked,
  onCheck,
  label
}: ICheckbox):ReactNode {
  return (
    <Pressable
      style={styles.checkBoxWrapper}
      onPress={onCheck}
    >
      {isChecked &&
        <View style={styles.unchecked}/>
      }
      {!isChecked &&
        <Icon size={24} name="checkbox-outline" color={Colors.WHITE} />
      }
      <Text style={styles.checkboxLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkBoxWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25
  },
  unchecked: {
    borderColor: Colors.WHITE,
    borderWidth: 1,
    borderRadius: 5,
    height: 20,
    width: 20,
    marginLeft: 2,
    marginTop: 2,
    marginRight: 2
  },
  checkboxLabel: {
    fontSize: 16,
    color: Colors.WHITE,
    paddingLeft: 10
  }
});
