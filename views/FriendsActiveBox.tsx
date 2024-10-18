import {IActiveFriendsState} from "@/state/activeFriendsSlice";
import {DisplayTextStateProp} from "@/state/displayLanguageSlice";
import PressableBox from "@/views/components/PressableBox";
import {ReactNode} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useSelector} from "react-redux";

export function FriendsActiveBox({}): ReactNode {
  const displayText = useSelector((state: DisplayTextStateProp) => state.displayText.displayTextJson);
  const numFriendsActive = useSelector((state: IActiveFriendsState) => state.activeFriends.numFriendsActive);

  const loadActiveFriendsModal = () => {
    console.log('show modal');
  };

  return (
    <PressableBox
      boxDisabled={false}
      onSelectBox={loadActiveFriendsModal}
    >
      <View style={styles.info}>
        <Text style={styles.infoText}>{displayText.index.friendsActive}</Text>
        <Text style={styles.infoCount}>({numFriendsActive})</Text>
      </View>
    </PressableBox>
  );
}

const styles = StyleSheet.create({
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
