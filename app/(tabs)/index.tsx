import {DisplayTextStateProp} from "@/state/displayLanguageSlice";
import ActionButton from "@/views/components/ActionButton";
import Icon from "@/views/components/Icon";
import Spacer from "@/views/components/Spacer";
import {GestureResponderEvent, StyleSheet, View, Text} from "react-native";
import {Colors} from "@/constants/Colors";
import PageTitle from "@/views/components/PageTitle";
import {ReactNode} from "react";
import PageWrapper from "@/views/components/PageWrapper";
import {useSelector} from "react-redux";

export default function Index(): ReactNode {
  const displayText = useSelector((state: DisplayTextStateProp) => state.displayText.displayTextJson);

  const onClickCheckIn = (e: GestureResponderEvent) => {
    console.log('check in');
  };

  return (
    <PageWrapper>
      <PageTitle
        title={displayText.index.title}
      />
      <Spacer />
      <View style={styles.infoBox}>
        <View style={styles.info}>
          <Text style={styles.infoText}>{displayText.index.friendsActive}</Text>
          <Text style={styles.infoCount}>(0)</Text>
        </View>
        <Icon size={24} name="chevron-forward-circle-outline" color={Colors.WHITE} />
      </View>
      <Spacer />
      <ActionButton onClickBtn={onClickCheckIn} btnDisplayText={displayText.index.checkInBtn} />
    </PageWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.BLACK
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: 5,
    borderColor: Colors.WHITE,
    borderWidth: 2,
    height: 50
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-start'
  },
  infoText: {
    fontSize: 20
  },
  infoCount: {
    fontSize: 14,
    paddingLeft: 5
  }
});
