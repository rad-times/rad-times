import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import {ElementRef, ReactNode, useEffect, useRef, useState} from "react";
import {Animated, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";

interface IBottomSheet {
  closeSheet: () => void;
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
  const translation = useRef(new Animated.Value(200)).current;
  const containerRef = useRef<View|null>(null)
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (shown) {
      Animated.timing(translation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start();
    }
  }, [shown]);

  containerRef.current && containerRef.current.measure((x,y,width,height) => {
    setContainerHeight(height);
  });

  const onPressCloseSheet = ()=> {
    Animated.timing(translation, {
      toValue: 200,
      duration: 150,
      useNativeDriver: true
    }).start(() => {
      closeSheet();
    });
  }

  return (
    <View style={[styles.bottomSheetWrapper, shown ? styles.shown : styles.hidden]}>
      <View style={styles.backgroundDimmer} />
      <Animated.View
        style={{
          width: '100%',
          transform: [{ translateY: translation }],
        }}
      >
        <View ref={containerRef} style={styles.bottomSheetBox}>
          <View style={styles.bottomSheetTopBar}>
            <View></View>
            <Text style={styles.bottomSheetLabel}>{label}</Text>
            <Pressable
              onPress={onPressCloseSheet}>
              <Icon size={30} name="close-circle-outline" color={Colors.LIGHT_GREY} />
            </Pressable>
          </View>
          <ScrollView style={styles.bottomSheetContentWrapper}>
            {children}
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundDimmer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.BLACK,
    opacity: .8
  },
  shown: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
  bottomSheetBox: {
    backgroundColor: Colors.DARK_GREY,
    marginBottom: 0,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 20
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
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingBottom: 30,
    backgroundColor: Colors.GREY,
    padding: 8
  }
});
