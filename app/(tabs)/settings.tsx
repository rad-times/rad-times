import {View, Text, StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";
import PageTitle from "@/components/atom/PageTitle";
import ActiveUserDetails from '@/components/ActiveUserDetails'

export default function settings() {
  return (
    <View style={styles.container}>
      <PageTitle
        title={"MY CURRENT SETUP"}
      />
      <ActiveUserDetails />
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
