import PageTitle from "@/views/components/PageTitle";
import {Text, StyleSheet, type TextProps} from "react-native";
import {Colors} from "@/constants/Colors";
import {ReactNode} from "react";

export type IHeaderText = TextProps & {
  text: string;
};

function HeaderText({
                      text
}: IHeaderText): ReactNode {
  return (
    <>
      <Text style={styles.text}>{text}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 5,
    color: Colors.WHITE,
  }
});

export default HeaderText;
