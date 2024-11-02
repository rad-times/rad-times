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
          backgroundColor: pressed ? Colors.DARK_RED : Colors.LIGHT_RED,
        },
        styles.button
      ]}
    >
      <Text style={[
        styles.buttonText,
        btnDisabled ? styles.disabled : styles.enabled
      ]}>{btnDisplayText}</Text>
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
    width: '100%',
    borderRadius: 25
  },
  link: {
    backgroundColor: Colors.WHITE,
    width: '100%'
  },
  buttonText: {
    fontSize: 18,
    paddingLeft: 30,
    paddingRight: 30
  },
  disabled: {
    color: Colors.DARK_RED,
  },
  enabled: {
    color: Colors.LIGHT_GREY,
  },
})
