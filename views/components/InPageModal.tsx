import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import {ReactNode, useEffect, useRef, useState} from "react";
import {Animated, Pressable, StyleSheet, View} from "react-native";

interface IInPageModal {
  closeModal: () => void;
  visible: boolean;
  children: ReactNode|ReactNode[]
}

export default function InPageModal({
  closeModal,
  visible,
  children
}:IInPageModal): ReactNode {
  const opacityFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacityFade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start();
    }
  }, [visible]);

  const onPressCloseModal = () => {
    Animated.timing(opacityFade, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    }).start(() => {
      closeModal();
    });
  }

  return (
    <View style={[styles.inScreenModalWrapper, {
      display: visible ? 'flex' : 'none'
    }]}>
      <View style={styles.backgroundDimmer} />
      <View style={styles.modalContentWrapper}>
        <Animated.View  style={[styles.modalContent, {
          opacity: opacityFade,
        }]}>
          <View style={styles.inScreenModalHeader}>
            <Pressable
              onPress={onPressCloseModal}
            >
              <Icon size={30} name="close" color={Colors.DARK_GREY} />
            </Pressable>
          </View>
          <View style={styles.inScreenModalChildren}>
            {children}
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inScreenModalWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100
  },
  backgroundDimmer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.BLACK,
    opacity: .8
  },
  modalContentWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    height: 300,
    backgroundColor: Colors.GREY,
    borderRadius: 10,
    borderColor: Colors.LIGHT_GREY,
    borderWidth: 1,
    overflow: 'hidden',
    width: '85%'
  },
  inScreenModalHeader: {
    backgroundColor: Colors.LIGHT_GREY,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    width: '100%'
  },
  inScreenModalChildren: {
    padding: 15
  }
});
