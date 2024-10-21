import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import {ReactNode} from "react";
import {NativeSyntheticEvent, Pressable, StyleSheet, TextInput, TextInputFocusEventData, View} from "react-native";
import _ from 'lodash';

interface FormInputProps {
  formValue: string | undefined
  onChangeInput?: Function
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  isMultiline?: boolean
  maxLength?: number
  clearField?: Function
  disabled?: boolean
  autoCorrect?: boolean
  autoFocus?: boolean
}

export default function FormInput_OLD(
  {
    formValue = '',
    onChangeInput,
    onFocus = _.noop,
    isMultiline = false,
    maxLength = 50,
    clearField,
    disabled = false,
    autoCorrect = true,
    autoFocus = false
}: FormInputProps): ReactNode {
  if (isMultiline) {
    return (
      <View style={styles.inputCombo}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={[styles.input, styles.multiLineInput]}
          onChangeText={(val) => {
            onChangeInput && onChangeInput(val)
          }}
          value={formValue}
          maxLength={maxLength}
          readOnly={disabled}
          autoCorrect={autoCorrect}
          autoFocus={autoFocus}
        />
        {_.isFunction(clearField) &&
            <Pressable
                style={styles.iconContainer}
                onPress={() => clearField()}
            >
                <Icon size={24} name="close" color={Colors.DARK_GREY} />
            </Pressable>
        }
      </View>
    );
  }
  return (
    <View style={styles.inputCombo}>
      <TextInput
        style={styles.input}
        onChangeText={(val) => {
          onChangeInput && onChangeInput(val);
        }}
        onFocus={onFocus}
        value={formValue}
        maxLength={maxLength}
        readOnly={disabled}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
      />

      {_.isFunction(clearField) &&
          <Pressable
              style={styles.iconContainer}
              onPress={() => clearField()}
          >
              <Icon size={24} name="close" color={Colors.DARK_GREY} />
          </Pressable>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    padding: 5,
    backgroundColor: Colors.LIGHT_GREY,
    borderColor: Colors.WHITE,
    borderWidth: 2,
    borderRightColor: Colors.LIGHT_GREY,
    fontSize: 18
  },
  multiLineInput: {
    height: 100
  },
  inputCombo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconContainer: {
    height: 40,
    width: 30,
    backgroundColor: Colors.LIGHT_GREY,
    borderColor: Colors.WHITE,
    borderWidth: 2,
    borderLeftColor: Colors.LIGHT_GREY,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  }
});
