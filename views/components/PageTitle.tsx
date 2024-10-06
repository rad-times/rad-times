import {View, Text, StyleSheet, type TextProps} from "react-native";
import {Colors} from "@/constants/Colors";

export type PageTitleProps = TextProps & {
  title: string;
};

function PageTitle({
  title
}: PageTitleProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.pageTitle}>{title}</Text>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
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
