import {Colors} from "@/constants/Colors";
import {Link} from "expo-router";
import {GestureResponderEvent, Pressable, StyleSheet, Text, View} from 'react-native';
import {ReactNode} from "react";
import _ from 'lodash';

interface ActionButtonProps {
  btnDisabled?: boolean;
  onClickBtn?: (e: GestureResponderEvent) => void;
  btnDisplayText: string;
  theme: "actionBtn" | "destroyBtn";
  btnWidthPercent?: 100 | 50 | 25;
  link?: "/spots/CreateNewSpot";
}

/**
 * Theme styles
 */
const BTN_THEMES = {
  "actionBtn": {
    normal: Colors.LIGHT_GREY,
    active: Colors.WHITE,
    disabled: Colors.GREY,
    textEnabled: Colors.GREY,
    textDisabled: Colors.MEDIUM_LIGHT_GRAY
  },
  "destroyBtn": {
    normal: Colors.DARK_RED,
    active: Colors.LIGHT_RED,
    disabled: Colors.PALE_RED,
    textEnabled: Colors.LIGHT_GREY,
    textDisabled: Colors.DARK_RED
  }
};

export default function ActionButton(
  {
    btnDisabled = false,
    onClickBtn = _.noop,
    btnDisplayText,
    btnWidthPercent = 100,
    theme = "actionBtn",
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
      style={({pressed}) => {
        const btnNormalStyle:string = BTN_THEMES[theme].normal;
        const btnActiveStyle:string = BTN_THEMES[theme].active;
        const btnDisabledStyle:string = BTN_THEMES[theme].disabled
        return [
          {
            backgroundColor: btnDisabled ? btnDisabledStyle : pressed ? btnNormalStyle : btnActiveStyle,
            width: btnWidthPercent === 100 ? `${btnWidthPercent}%` : `${btnWidthPercent - 3}%`,
          },
          styles.button
        ]
      }}
    >
      <Text style={[
        styles.buttonText,
        {
          color: btnDisabled ? BTN_THEMES[theme].textDisabled : BTN_THEMES[theme].textEnabled
        }
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
    borderRadius: 5
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
})
