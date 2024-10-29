import {Colors} from "@/constants/Colors";
import CommonModalContentWrapper from "@/views/components/CommonModalContentWrapper";
import Icon from "@/views/components/Icon";
import {CameraType, CameraView} from "expo-camera";
import {createRef, Dispatch, ReactNode, SetStateAction, useState} from "react";
import {StyleSheet, TouchableOpacity, Text, View, Modal} from "react-native";

interface ICamera {
  cameraShown: boolean
  toggleCameraShown: Dispatch<SetStateAction<boolean>>
}

export default function Camera({
  cameraShown,
  toggleCameraShown
}:ICamera): ReactNode {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flashOn, toggleFlash] = useState(false);
  const cameraRef = createRef<CameraView>();

  const toggleCameraFacing = ()=> {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const pressFlashToggle = () => {
    toggleFlash(flashOn ? false : true);
  }

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({
      quality: 0.5,
      base64: true
    });

    console.log('photo', photo);
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={cameraShown}
    >
      <CommonModalContentWrapper
        onTapCloseModal={() => toggleCameraShown(false)}
        nameToShow={''}
        topBarShown={false}
      >
        <View style={styles.container}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            enableTorch={flashOn}
            facing={facing}
          >
          </CameraView>
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.button} onPress={() => pressFlashToggle()}>
              <Icon size={30} name={flashOn ? "flash-off" : "flash"} color={Colors.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => takePhoto()}>
              <Icon size={50} name="stop-circle-sharp" color={Colors.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => toggleCameraFacing()}>
              <Icon size={30} name="camera-reverse" color={Colors.WHITE} />
            </TouchableOpacity>
          </View>
        </View>
      </CommonModalContentWrapper>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  camera: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  actionContainer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.BLACK
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
