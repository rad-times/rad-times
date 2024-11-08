import {SafeAreaView, StyleSheet, Pressable, PressableProps, Image} from "react-native";
import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import {ReactNode} from "react";

export type FiltersBtnProps = {
  onPress: Function
};

function FiltersBtn({
  onPress
}: PressableProps): ReactNode {
  return (
    <SafeAreaView>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? Colors.LIGHT_GREY : Colors.WHITE,
          },
          styles.wrapper,
        ]}>
        <Icon size={24} name="options" color={Colors.DARK_GREY} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 40,
    width: 70,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});


export default FiltersBtn;
