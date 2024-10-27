import {Colors} from "@/constants/Colors";
import ActionButton from "@/views/components/ActionButton";
import Icon from "@/views/components/Icon";
import BottomSheet from '@/views/components/BotttomSheet';
import InPageModal from "@/views/components/InPageModal";
import PageWrapper from "@/views/components/PageWrapper";
import {useNavigation} from "expo-router";
import {ReactNode, useState} from "react";
import {Button, Modal, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

interface IAddPhotoInput {
}

export default function AddPhotoInput({

}: IAddPhotoInput):ReactNode {
  const [imageTypePickerOpen, toggleImageTypePicker] = useState<boolean>(false);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permissionsModalShown, showPermissionsModal] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const navigation = useNavigation();

  const closeImageTypePicker = () => {
    navigation.setOptions({
      headerBackVisible: true,
    });
    toggleImageTypePicker(false);
  };

  const openImageTypePicker = () => {
    navigation.setOptions({
      headerBackVisible: false
    });
    toggleImageTypePicker(true);
  }

  const pressTakeAPhoto = () => {
    closeImageTypePicker();
    if (!permission || !permission.granted) {
      showPermissionsModal(true);
    }
  };

  const pressUploadPhoto = () => {};

  return (
    <>
      <InPageModal
        closeModal={() => {
          showPermissionsModal(false);
        }}
        visible={permissionsModalShown}
      >
        <Text style={{
          color: Colors.WHITE,
          fontSize: 18,
          marginBottom: 20
        }}>We need your permission to show the camera</Text>
        <ActionButton
          onClickBtn={() => {
            requestPermission()
              .finally(() => {
                showPermissionsModal(false);
              });
          }}
          btnDisplayText="grant permission"
        />
      </InPageModal>

      <Pressable
        style={styles.addPhotoWrapper}
        onPress={openImageTypePicker}
      >
        <Icon size={24} name="camera-outline" color={Colors.WHITE}/>
      </Pressable>
      <BottomSheet
        closeSheet={closeImageTypePicker}
        shown={imageTypePickerOpen}
        label={'Add a location photo'}
      >
        <Pressable
          style={styles.optionRow}
          onPress={pressTakeAPhoto}
        >
          <Icon size={24} name="camera-outline" color={Colors.WHITE} />
          <Text style={styles.optionText}>{'Take a photo.'}</Text>
        </Pressable>
        <Pressable
          style={styles.optionRow}
          onPress={pressUploadPhoto}
        >
          <Icon size={24} name="cloud-upload-outline" color={Colors.WHITE} />
          <Text style={styles.optionText}>{'Upload a photo.'}</Text>
        </Pressable>

      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  addPhotoWrapper: {
    height: 50,
    width: 50,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    borderRadius: 5,
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 15
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10,
    paddingRight: 10
  },
  optionText: {
    fontSize: 18,
    color: Colors.LIGHT_GREY,
    paddingLeft: 10
  },
  permissionsModal: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: Colors.WHITE
  }
});
