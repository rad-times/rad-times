import {Colors} from "@/constants/Colors";
import ActionButton from "@/views/components/ActionButton";
import Icon from "@/views/components/Icon";
import BottomSheet from '@/views/components/BotttomSheet';
import InPageModal from "@/views/components/InPageModal";
import Camera from '@/views/Camera';
import {useNavigation} from "expo-router";
import {ReactNode, useState} from "react";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

interface IAddPhotoInput {
}

export default function AddPhotoInput({

}: IAddPhotoInput):ReactNode {
  const [imageTypePickerOpen, toggleImageTypePicker] = useState<boolean>(false);
  const [cameraPermissionsModalShown, showCameraPermissionsModal] = useState(false);
  const [showCamera, toggleShowCamera] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const [photoLibraryPermissionsModalShown, showPhotoLibraryPermissionsModal] = useState(false);
  const [showPhotoLibrary, toggleShowPhotoLibrary] = useState(false);
  const [photoLibraryPermission, requestPhotoLibraryPermission] = ImagePicker.useMediaLibraryPermissions();

  const [image, setImage] = useState<string | null>(null);
  const [imageSelected, setImageSelected] = useState<boolean>(false);

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
    // @TODO move all camera code to the Camera component / hooks
    if (!cameraPermission || !cameraPermission.granted) {
      showCameraPermissionsModal(true);
      return;
    }
    toggleShowCamera(true);
  };

  const pressUploadPhoto = () => {
    closeImageTypePicker();

    if (!photoLibraryPermission || !photoLibraryPermission.granted) {
      console.log('permissions  NOT YET granted');
      requestPhotoLibraryPermission()
        .then(permissionResponse => {
          if (permissionResponse.granted) {
            pressUploadPhoto();
          }
        })
      return;
    }
    console.log('permissions granted');
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    //
    // console.log(result);
    //
    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    //   setImageSelected(true);
    // }
  };

  return (
    <>
      <InPageModal
        closeModal={() => {
          showCameraPermissionsModal(false);
        }}
        visible={cameraPermissionsModalShown}
      >
        <Text style={{
          color: Colors.WHITE,
          fontSize: 18,
          marginBottom: 20
        }}>We need your permission to show the camera</Text>
        <ActionButton
          onClickBtn={() => {
            requestCameraPermission()
              .finally(() => {
                showCameraPermissionsModal(false);
              });
          }}
          btnDisplayText="grant permission"
        />
      </InPageModal>

      <Camera
        cameraShown={showCamera}
        toggleCameraShown={toggleShowCamera}
      />

      <View style={[styles.imageContainer, {
        display: imageSelected ? 'flex' : 'none'
      }]}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>

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
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
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
