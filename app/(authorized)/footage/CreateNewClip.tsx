import {uploadNewClip} from "@/api/clipApi";
import {LABEL_TEXT, LABEL_TEXT_ITALIC} from "@/constants/Styles";
import {useAuthSession} from "@/providers/AuthProvider";
import {ActiveUserStateProp} from "@/state/activeUserSlice";
import AddPhotoInput from "@/views/AddPhotoInput";
import ActionButton from "@/views/components/ActionButton";
import PageWrapper from "@/views/components/PageWrapper";
import Spacer from "@/views/components/Spacer";
import SaveCancelBtnBlock from "@/views/SaveCancelBtnBlock";
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {useMutation} from "@tanstack/react-query";
import {router} from "expo-router";
import React, {ReactNode, useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Snackbar} from "react-native-paper";
import {useSelector} from "react-redux";

interface IUploadNewClip {
}

export default function UploadNewClip({

}:IUploadNewClip): ReactNode {
  const {token} = useAuthSession();
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);

  const [photoData, setPhotoData] = useState<string>("");
  const [photoName, setPhotoName] = useState<string>("");
  const [createDate, setDate] = useState<Date>(new Date());
  const [formValid, setFormValid] = useState<boolean>(false);
  const [spotPickerShown, setSpotPickerShown] = useState<boolean>(false);

  const uploadNewClipMut = useMutation({
    mutationFn: () => {
      const dateToSave:number = createDate?.getTime();
      return uploadNewClip({
        sessionToken: token?.current || "",
        userId: activeUser.id,
        newClipData: {
          photoData,
          photoName: `clip-${activeUser.first_name}${activeUser.last_name}-${dateToSave}.${photoName.substring(photoName.length - 3)}`,
          createDate: dateToSave,
          spotId: 1
        }
      })
    },
    onError()  {

    },
    onSuccess(resp) {
      debugger;
    }
  })

  useEffect(() => {
    setFormValid(photoData !== "");
  }, [photoData]);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date|undefined) => {
    selectedDate && setDate(selectedDate);
  };

  return (
    <>
      <PageWrapper>
        <View style={styles.formWrapper}>
          <AddPhotoInput setPhotoData={(photoData) => {
            setPhotoData(photoData.base64);
            setPhotoName(photoData.name);
          }} />
          <Spacer margin={30} />
          <View style={styles.formElementWrapper}>
            <Text style={LABEL_TEXT}>Date of clip:</Text>
            <Spacer margin={8}/>
            <DateTimePicker
              testID="dateTimePicker"
              value={createDate}
              mode={'date'}
              is24Hour={true}
              themeVariant={'dark'}
              onChange={onChangeDate}
            />
          </View>
          <Spacer margin={30} />
          <View style={styles.formElementWrapper}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start'}}>
              <Text style={[LABEL_TEXT,  {paddingRight: 5}]}>Spot</Text>
              <Text style={LABEL_TEXT_ITALIC}>(optional):</Text>
            </View>
            <Spacer margin={8}/>
            <ActionButton
              btnDisplayText={"Pick a spot"}
              btnWidthPercent={50}
              theme={"actionBtn"}
              onClickBtn={():void => setSpotPickerShown(true)}
            />
          </View>
        </View>

        <SaveCancelBtnBlock
          saveAction={() => uploadNewClipMut.mutate()}
          saveEnabled={formValid}
          cancelAction={() => router.back()}
        />
      </PageWrapper>

      <Snackbar
        visible={uploadNewClipMut.isError}
        onDismiss={() => {
        }}
        action={{
          label: "Dismiss",
          onPress: () => {
          },
        }}
      >
        {uploadNewClipMut?.error?.message || "Error creating new clip."}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1
  },
  formElementWrapper: {
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "flex-start"
  }
})
