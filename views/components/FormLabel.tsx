import {Colors} from "@/constants/Colors";
import {ReactNode} from "react";
import {StyleSheet, Text} from "react-native";

interface FormLabelProps {
  labelText: string
}

export default function FormLabel({
  labelText
}: FormLabelProps): ReactNode {
  return (
    <>
      <Text style={styles.formLabel}>{labelText}:</Text>
    </>
  );
}

const styles = StyleSheet.create({
  formLabel: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 5,
    color: Colors.LIGHT_GREY
  }
});
