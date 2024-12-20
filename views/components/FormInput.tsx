import {Colors} from "@/constants/Colors";
import _ from "lodash";
import {ReactNode} from "react";
import {NativeSyntheticEvent, TextInput, Text, StyleSheet, TextInputFocusEventData, View} from "react-native";

interface IFormInputProps {
  label?: string;
  formValue: string | undefined
  onChangeInput?: (text: string) => void
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  isMultiline?: boolean
  maxLength?: number
  clearField?: Function
  disabled?: boolean
  autoCorrect?: boolean
  autoCapitalize?: "sentences" | "none"
  autoFocus?: boolean
}

export default function FormInput(
  {
    label,
    formValue = '',
    onChangeInput,
    onFocus = _.noop,
    isMultiline = false,
    maxLength = 50,
    disabled = false,
    autoCorrect = false,
    autoCapitalize = "sentences",
    autoFocus = false
  }: IFormInputProps): ReactNode {
  return (
    <View style={styles.formInputWrapper}>
      {label &&
          <Text style={styles.formLabel}>{label}</Text>
      }
      {isMultiline &&
          <TextInput
              style={[styles.input, styles.multiLineInput, disabled ? styles.inputDisabled : {}]}
              value={formValue}
              onChangeText={onChangeInput}
              maxLength={maxLength}
              readOnly={disabled}
              autoCorrect={autoCorrect}
              autoFocus={autoFocus}
              autoCapitalize={autoCapitalize}
              onFocus={onFocus}
              multiline={true}
              numberOfLines={4}
          />
      }
      {!isMultiline &&
          <TextInput
              style={[styles.input, disabled ? styles.inputDisabled : {}]}
              value={formValue}
              onChangeText={onChangeInput}
              maxLength={maxLength}
              readOnly={disabled}
              autoCorrect={autoCorrect}
              autoFocus={autoFocus}
              onFocus={onFocus}
          />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  formInputWrapper: {
    marginTop: 5,
    marginBottom: 15
  },
  input: {
    color: Colors.WHITE,
    borderColor: Colors.WHITE,
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: -5
  },
  inputDisabled: {
    borderColor: Colors.GREY,
    color: Colors.GREY,
  },
  multiLineInput: {
    height: 100
  },
  formLabel: {
    backgroundColor: Colors.BLACK,
    alignSelf: 'flex-start',
    marginLeft: 10,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 14,
    color: Colors.MEDIUM_LIGHT_GRAY,
    zIndex: 100
  }
});
