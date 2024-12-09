import {Colors} from "@/constants/Colors";
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

/*
 * Fonts
 */
export const LABEL_TEXT: StyleProp<TextStyle> = {
  color: Colors.LIGHT_GREY,
  fontSize: 18,
  fontWeight: 'normal'
};

export const BODY_TEXT:StyleProp<TextStyle> = {
  color: Colors.LIGHT_GREY,
  fontSize: 18,
  fontWeight: 'normal'
}

/*
 * Views
 */
export const CENTER_ON_PAGE:StyleProp<ViewStyle> = {
  flexDirection: 'column',
  justifyContent: 'center',
  flex: 1
}

export const BOTTOM_BUTTON:StyleProp<ViewStyle> = {
  flexDirection: 'row',
  justifyContent: 'space-between'
}

export const CONTENT_FULL_PAGE:StyleProp<ViewStyle> = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1
}

export const CENTER_CONTENT_FULL_PAGE:StyleProp<ViewStyle> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: 1
}
