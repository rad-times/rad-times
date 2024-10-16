import {Colors} from "@/constants/Colors";
import {IActiveFriendsState} from "@/state/activeFriendsSlice";
import {DisplayTextStateProp} from "@/state/displayLanguageSlice";
import Icon from "@/views/components/Icon";
import {ReactNode} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {useSelector} from "react-redux";

export function FriendsActiveBox({}): ReactNode {
  const displayText = useSelector((state: DisplayTextStateProp) => state.displayText.displayTextJson);
  const numFriendsActive = useSelector((state: IActiveFriendsState) => state.activeFriends.numFriendsActive);

  const loadActiveFriendsModal = () => {
    console.log('show modal');
  };

  return (
    <Pressable
      onPress={loadActiveFriendsModal}
      style={styles.infoBox}
    >
      <View style={styles.info}>
        <Text style={styles.infoText}>{displayText.index.friendsActive}</Text>
        <Text style={styles.infoCount}>({numFriendsActive})</Text>
      </View>
      <Icon size={24} name="chevron-forward-circle-outline" color={Colors.DARK_GREY} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
