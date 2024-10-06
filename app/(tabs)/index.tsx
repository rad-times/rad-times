import {View, Text, StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";
import PageTitle from "@/views/components/PageTitle";
import {ReactNode} from "react";

export default function index(): ReactNode {
  return (
    <View style={styles.container}>
      <PageTitle
        title={"NEW HOTNESS"}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.BLACK
  }
});
