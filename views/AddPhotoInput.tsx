import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import BottomSheet from '@/views/components/BotttomSheet';
import {ReactNode, useState} from "react";
import {Pressable, StyleSheet, Text} from "react-native";

interface IAddPhotoInput {
}

export default function AddPhotoInput({

}: IAddPhotoInput):ReactNode {
  const [imageTypePickerOpen, toggleImageTypePicker] = useState<boolean>(false);
  const closeImageTypePicker = () => {
    toggleImageTypePicker(false);
  };

  const openImageTypePicker = () => {
    toggleImageTypePicker(true);
  }

  const clickTakeAPhoto = () => {
  };

  const clickUploadPhoto = () => {

  };

  return (
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
          onPress={clickTakeAPhoto}
        >
          <Icon size={24} name="camera-outline" color={Colors.WHITE} />
          <Text style={styles.optionText}>{'Take a photo.'}</Text>
        </Pressable>
        <Pressable
          style={styles.optionRow}
          onPress={clickTakeAPhoto}
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
    padding: 10
  },
  optionText: {
    fontSize: 18,
    color: Colors.LIGHT_GREY,
    paddingLeft: 10
  }
});
