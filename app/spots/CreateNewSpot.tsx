import useCurrentLocation, {
  ICurrentLocationResp
} from "@/hooks/useCurrentLocation";
import {
  LABEL_TEXT
} from "@/constants/Styles";
import {setSearchInput} from "@/state/googleLocationsSlice";
import {CreateNewSpotStateProp, setNewSpotModelData} from "@/state/newSpotSlice";
import {Geolocation} from "@/types/Geolocation";
import ActionButton from "@/views/components/ActionButton";
import Checkbox from "@/views/components/Checkbox";
import FormInput from "@/views/components/FormInput";
import HeaderText from "@/views/components/HeaderText";
import AddPhotoInput from "@/views/AddPhotoInput";
import PageWrapper from "@/views/components/PageWrapper";
import Spacer from "@/views/components/Spacer";
import LocationSearch from "@/views/LocationSearch";
import PageLoading from "@/views/PageLoading";
import {ReactNode, useEffect, useState} from "react";
import {Keyboard, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

export default function CreateNewSpot({} ): ReactNode {
  const [submitDisabled, toggleSubmitDisabled] = useState<boolean>(true);
  const newSpot = useSelector((state:CreateNewSpotStateProp) => state.createNewSpot.newSpot);
  const dispatch = useDispatch();

  const [isPrivate, setIsPrivate] = useState(false);
  const [usingCurrentLocation, setUseCurrentLocation] = useState(true);
  const [formReady, setFormReady] = useState(false);
  const {locationDisplayString, errorMsg, usersLocationLoaded}: ICurrentLocationResp = useCurrentLocation();

  useEffect(() => {
    if (usersLocationLoaded) {
      dispatch(setSearchInput(locationDisplayString));
      setFormReady(true);
    }
  }, [usersLocationLoaded]);

  useEffect(() => {
    if (errorMsg && errorMsg.length) {
      console.error('Error setting location', errorMsg);
    }
  }, [errorMsg]);


  const submitSpot = () => {
    console.log('submit')
  }

  const setLocation = (location: Geolocation) => {
  }

  const handleBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <PageWrapper>
      {!formReady &&
        <PageLoading />
      }
      {formReady &&
        <TouchableWithoutFeedback
          onPress={handleBlur}
        >
          <View style={styles.newSpotFormWrapper}>
            <View style={{
              width: '100%'
            }}>
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
                isChecked={usingCurrentLocation}
                onCheck={(checked) => setUseCurrentLocation(checked)}
                label={'Use current location?'}
              />
              <LocationSearch
                onSelectLocation={setLocation}
                disabled={usingCurrentLocation}
              />
              <Spacer />
              <AddPhotoInput />
              <Spacer />
              <Checkbox
                isChecked={isPrivate}
                onCheck={(checked) => setIsPrivate(checked)}
                label={'Private spot?'}
              />
            </View>
            <ActionButton
              btnDisplayText={"Submit Spot"}
              onClickBtn={submitSpot}
              btnDisabled={submitDisabled}
            />
          </View>
        </TouchableWithoutFeedback>
      }
    </PageWrapper>
  )
}

const styles = StyleSheet.create({
  newSpotFormWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  }
});
