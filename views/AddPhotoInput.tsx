import {Colors} from "@/constants/Colors";
import ActionButton from "@/views/components/ActionButton";
import Icon from "@/views/components/Icon";
import BottomSheet from '@/views/components/BotttomSheet';
import InPageModal from "@/views/components/InPageModal";
import Camera from '@/views/Camera';
import {useNavigation} from "expo-router";
import {ReactNode, useState} from "react";
import {Image, Pressable, ActivityIndicator, StyleSheet, Text, View} from "react-native";
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

  const removeImage = () => {
    setImage(null);
    setImageSelected(false);
  }

  const pressUploadPhoto = () => {
    closeImageTypePicker();

    if (!photoLibraryPermission || !photoLibraryPermission.granted) {
      requestPhotoLibraryPermission()
        .then(permissionResponse => {
          if (permissionResponse.granted) {
            pressUploadPhoto();
          }
        })
      return;
    }

    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      base64: true
    })
      .then(result => {
        if (!result.canceled) {
          setImage(result.assets[0].uri);
          setImageSelected(true);
        }
      });
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

      {/* After user has picked or taken an image */}
      {imageSelected &&
          <View style={styles.imageContainer}>
              {image &&
                  <Image source={{ uri: image }} style={styles.image} />
              }
              <Pressable
                  onPress={removeImage}
                  style={styles.removeImage}
              >
                  <Icon size={24} name="close-circle-sharp" color={Colors.BLACK}/>
              </Pressable>
          </View>
      }

      {/* No image yet taken or selected */}
      {!imageSelected &&
          <>
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
      }
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  image: {
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREY,
    borderRadius: 5,
    height: '100%',
    width: '100%'
  },
  removeImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 25,
    width: 25,
    backgroundColor: Colors.LIGHT_GREY,
    borderBottomLeftRadius: 10
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
