import {View, StyleSheet} from "react-native";

import {Colors} from "@/constants/Colors";
import PageTitle from "@/views/components/PageTitle";
import ActiveUserDetails from '@/views/ActiveUserDetails'
import StackLink from '@/views/StackLink'
import {ReactNode} from "react";
import PageWrapper from "@/views/components/PageWrapper";

export default function Setup(): ReactNode {
  return (
    <PageWrapper>
      <PageTitle
        title={"MY CURRENT SETUP"}
      />
      <View style={styles.setupWrapper}>
        <ActiveUserDetails />
        <View style={styles.spacer}></View>
        <StackLink
          title={"Edit My Profile"}
          link={"/setup/EditProfile"}
        />
        <View style={styles.spacer}></View>
        <StackLink
          title={"My Social Media Links"}
          link={"/setup/SocialLinks"}
        />
        <View style={styles.spacer}></View>
        <StackLink
          title={"Session Photos / Videos"}
          link={"/setup/PhotoVideo"}
        />
        <View style={styles.spacer}></View>
        <StackLink
          title={"Settings and Preferences"}
          link={"/setup/Settings"}
        />
      </View>
    </PageWrapper>
  );
}
const styles = StyleSheet.create({
  spacer: {
    marginBottom: 25
  },
  setupWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  }
});
