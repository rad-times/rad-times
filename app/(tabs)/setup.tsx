import {View, StyleSheet} from "react-native";

import {Colors} from "@/constants/Colors";
import PageTitle from "@/views/components/PageTitle";
import ActiveUserDetails from '@/views/ActiveUserDetails'
import StackLink from '@/views/StackLink'
import {ReactNode} from "react";

export default function SetupStack(): ReactNode {
  return (
    <View style={styles.container}>
      <PageTitle
        title={"MY CURRENT SETUP"}
      />
      <View style={styles.setupWrapper}>
        <ActiveUserDetails />
        <View style={styles.spacer}></View>
        <StackLink
          title={"Edit My Profile"}
          link={"/setup/edit_profile"}
        />
        <View style={styles.spacer}></View>
        <StackLink
          title={"My Social Media Links"}
          link={"/setup/social_links"}
        />
        <View style={styles.spacer}></View>
        <StackLink
          title={"Session Photos / Videos"}
          link={"/setup/photo_video"}
        />
        <View style={styles.spacer}></View>
        <StackLink
          title={"Settings and Preferences"}
          link={"/setup/settings"}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK
  },
  spacer: {
    marginBottom: 25
  },
  setupWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginLeft: 20,
    marginRight: 20
  }
});
