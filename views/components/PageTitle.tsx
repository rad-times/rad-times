import {View, Text, StyleSheet, type TextProps} from "react-native";
import {Colors} from "@/constants/Colors";
import {ReactNode} from "react";

export type PageTitleProps = TextProps & {
  title: string;
};

function PageTitle({
  title
}: PageTitleProps): ReactNode {
  return (
    <>
      <Text style={styles.pageTitle}>{title}</Text>
      <View style={styles.divider} />
    </>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.WHITE,
  },
  divider: {
    height: 2,
    borderColor: Colors.LIGHT_GREY,
    borderStyle: 'solid',
    borderWidth: 1
  }
});

export default PageTitle;
