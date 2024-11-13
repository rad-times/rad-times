import Spacer from "@/views/components/Spacer";
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
        <Spacer margin={25} />
        <StackLink
          title={"Edit My Profile"}
          link={"/setup/EditProfile"}
        />
        <Spacer margin={25} />
        <StackLink
          title={"My Social Media Links"}
          link={"/setup/SocialLinks"}
        />
        <Spacer margin={25} />
        <StackLink
          title={"Session Photos / Videos"}
          link={"/setup/PhotoVideo"}
        />
        <Spacer margin={25} />
        <StackLink
          title={"Settings and Preferences"}
          link={"/setup/Settings"}
        />
      </View>
    </PageWrapper>
  );
}
const styles = StyleSheet.create({
  setupWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  }
});
