import {Colors} from "@/constants/Colors";
import {Link} from "expo-router";
import {GestureResponderEvent, Pressable, StyleSheet, Text, View} from 'react-native';
import {ReactNode} from "react";
import _ from 'lodash';

interface ActionButtonProps {
  btnDisabled?: boolean,
  onClickBtn?: (e: GestureResponderEvent) => void
  btnDisplayText: string
  link?: "/spots/CreateNewSpot"
}

export default function ActionButton(
  {
    btnDisabled = false,
    onClickBtn = _.noop,
    btnDisplayText,
    link
}: ActionButtonProps): ReactNode {

  if (!_.isNil(link)) {
    return (
      <Link
        push
        href={{
          pathname: link
        }}
      >
        <View style={[styles.button, styles.link]}>
          <Text style={styles.buttonText}>{btnDisplayText}</Text>
        </View>
      </Link>
    )
  }

  return (
    <Pressable
      onPress={onClickBtn}
      disabled={btnDisabled}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? Colors.LIGHT_GREY : Colors.WHITE,
        },
        styles.button
      ]}
    >
      <Text style={styles.buttonText}>{btnDisplayText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 25
  },
  link: {
    backgroundColor: Colors.WHITE,
    width: '100%'
  },
  buttonText: {
    color: Colors.DARK_GREY,
    fontSize: 18,
    paddingLeft: 30,
    paddingRight: 30
  }
})
