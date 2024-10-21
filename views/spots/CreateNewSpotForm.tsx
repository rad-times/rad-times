import {Colors} from "@/constants/Colors";
import {CreateNewSpotStateProp, setNewSpotModelData} from "@/state/newSpotSlice";
import {setCreateNewSpotModalShown} from "@/state/spotSlice";
import Checkbox from "@/views/components/Checkbox";
import CommonModalContentWrapper from "@/views/components/CommonModalContentWrapper";
import FormInput from "@/views/components/FormInput";
import HeaderText from "@/views/components/HeaderText";
import AddPhotoInput from "@/views/AddPhotoInput";
import PageWrapper from "@/views/components/PageWrapper";
import Spacer from "@/views/components/Spacer";
import {ReactNode, useState} from "react";
import {GestureResponderEvent, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

export default function CreateNewSpotForm({} ): ReactNode {
  const newSpot = useSelector((state:CreateNewSpotStateProp) => state.createNewSpot.newSpot);
  const dispatch = useDispatch();
  const [isPrivate, setIsPrivate] = useState(false);

  /*
    spot name
    description
    photo
    location data
    is private
    keywords
   */
  return (
    <CommonModalContentWrapper
      onTapCloseModal={() =>  dispatch(setCreateNewSpotModalShown(false))}
      nameToShow={''}
    >
      <PageWrapper>
        <HeaderText text={"Enter spot details"}/>
        <Spacer />
        <FormInput
          label={'Spot Name'}
          formValue={''}
          onChangeInput={(val:string) => dispatch(setNewSpotModelData({key: 'spot_name', value: val}))}
          maxLength={50}
        />
        <FormInput
          label={'Spot Description'}
          formValue={''}
          isMultiline={true}
          onChangeInput={(val:string) => dispatch(setNewSpotModelData({key: 'spot_name', value: val}))}
          maxLength={200}
        />
        <Checkbox
          isChecked={isPrivate}
          onCheck={(e: GestureResponderEvent) => setIsPrivate(!isPrivate)}
          label={'Private spot?'}
        />
        <AddPhotoInput />
      </PageWrapper>
    </CommonModalContentWrapper>
  )
}

const styles = StyleSheet.create({
  newSpotFormWrapper: {
    backgroundColor: Colors.BLACK,
    flex: 1
  }
});
