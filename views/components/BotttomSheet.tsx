import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import {ReactNode} from "react";
import {GestureResponderEvent, Pressable, StyleSheet, Text, View} from "react-native";

interface IBottomSheet {
  closeSheet: (e: GestureResponderEvent) => void;
  shown: boolean;
  label?: string;
  children: ReactNode|ReactNode[]
}

export default function BottomSheet({
  closeSheet,
  shown,
  label,
  children
}:IBottomSheet): ReactNode {

  return (
    <View style={[styles.bottomSheetWrapper, shown ? styles.shown : styles.hidden]}>
      <View style={styles.backgroundDimmer} />

      <View style={styles.bottomSheetBox}>
        <View style={styles.bottomSheetTopBar}>
          <View></View>
          <Text style={styles.bottomSheetLabel}>{label}</Text>
          <Pressable
            onPress={closeSheet}>
            <Icon size={30} name="close-circle-outline" color={Colors.LIGHT_GREY} />
          </Pressable>
        </View>
        <View style={styles.bottomSheetContentWrapper}>
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetWrapper: {
    // @ts-ignore
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundDimmer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.BLACK,
    opacity: .7
  },
  bottomSheetBox: {
    backgroundColor: Colors.DARK_GREY,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20,
    minHeight: 150,
    overflow: "hidden"
  },
  shown: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
  bottomSheetTopBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
    paddingLeft: 10,
    paddingRight: 10
  },
  bottomSheetLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.LIGHT_GREY
  },
  bottomSheetContentWrapper: {
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 6,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    flex: 1,
    backgroundColor: Colors.GREY,
    padding: 8
  }
});
