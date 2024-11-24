import useCurrentLocation, {
  ICurrentLocationResp
} from "@/hooks/useCurrentLocation";
import {setSearchInput} from "@/state/googleLocationsSlice";
import {setNewSpotModelData} from '@/state/spotSlice';
import {SpotState} from "@/state/spotSlice";
import {Geolocation} from "@/types/Geolocation";
import ActionButton from "@/views/components/ActionButton";
import Checkbox from "@/views/components/Checkbox";
import FormInput from "@/views/components/FormInput";
import HeaderText from "@/views/components/HeaderText";
import AddPhotoInput from "@/views/AddPhotoInput";
import PageWrapper from "@/views/components/PageWrapper";
import Spacer from "@/views/components/Spacer";
import PageLoading from "@/views/PageLoading";
import {ReactNode, useEffect, useState} from "react";
import {Keyboard, ScrollView, StyleSheet, Modal, View, TouchableWithoutFeedback} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';

export default function CreateNewSpot({} ): ReactNode {
  const [submitDisabled, toggleSubmitDisabled] = useState<boolean>(true);
  const newSpot = useSelector((state: SpotState) => state.spotList.newSpot);
  const dispatch = useDispatch();

  const [showSpotMapModal, setShowSpotMapModal] = useState<boolean>(false);
  const [formReady, setFormReady] = useState(false);
  const {locationObj, locationDisplayString, errorMsg, usersLocationLoaded}: ICurrentLocationResp = useCurrentLocation();

  /**
   * Set up a new, blank spot when form loads
   */
  useEffect(() => {
    dispatch(setNewSpotModelData({
      spot_name: '',
      spot_description: '',
      spot_image: '',
      is_private: false,
      keywords: [],
      location: {
        lat: -1,
        lng: -1,
        street_number: '',
        street_name: '',
        city_name: '',
        state_name: '',
        country_name: '',
        postal_code: ''
      }
    }));
  }, []);

  useEffect(() => {
    if (usersLocationLoaded) {
      setLocation({
        // Typescript thinks lat and lng are methods to be called?
        // @ts-ignore
        lat: locationObj.geometry.location.lat,
        // @ts-ignore
        lng: locationObj.geometry.location.lng,
        city_name: locationObj.address_components[1].long_name,
        state_name:  locationObj.address_components[3].long_name,
        country_name:  locationObj.address_components[4].long_name,
        postal_code:  locationObj.address_components[5].long_name
      });
      dispatch(setSearchInput(locationDisplayString));
      setFormReady(true);
    }
  }, [usersLocationLoaded]);

  useEffect(() => {
    if (errorMsg && errorMsg.length) {
      console.error('Error setting location', errorMsg);
    }
  }, [errorMsg]);

  useEffect(() => {
    if (_.isEmpty(newSpot)) {
      toggleSubmitDisabled(true);
      return;
    }

    const spotFullyPopulated = () => {
      return newSpot && newSpot.spot_description !== '' &&
        newSpot.spot_name !== '' &&
        newSpot.spot_image !== '';
    }

    console.log('spotFullyPopulated', spotFullyPopulated());
    if (spotFullyPopulated()) {
      toggleSubmitDisabled(false);
      return;
    }

    toggleSubmitDisabled(true);
  }, [newSpot]);

  const submitSpot = () => {
    console.log('submit')
  }

  const setLocation = (location: Geolocation) => {
  }

  const setPhoto = (photoBase64: string) => {
    dispatch(setNewSpotModelData({propertyKey: 'spot_image', value: photoBase64}));
  }

  const handleBlur = () => {
    Keyboard.dismiss();
  };

  const openSpotLocationMap = () => {
    setShowSpotMapModal(true);
  }

  return (
    <PageWrapper>
      {!formReady &&
        <PageLoading />
      }
      {formReady &&
          <>
              <Modal
                  animationType="slide"
                  transparent={false}
                  visible={showSpotMapModal}
              >
              </Modal>

              <TouchableWithoutFeedback
                  onPress={handleBlur}
              >
                  <View style={styles.newSpotFormWrapper}>
                      <View style={{
                        width: '100%'
                      }}>
                          <HeaderText text={"Enter spot details"}/>
                          <Spacer />
                          <ScrollView>
                              <FormInput
                                  label={'Spot Name'}
                                  formValue={newSpot.spot_name || ''}
                                  onChangeInput={(val:string) => dispatch(setNewSpotModelData({propertyKey: 'spot_name', value: val}))}
                                  maxLength={50}
                              />
                              <FormInput
                                  label={'Spot Description'}
                                  formValue={newSpot.spot_description || ''}
                                  isMultiline={true}
                                  onChangeInput={(val:string) => dispatch(setNewSpotModelData({propertyKey: 'spot_description', value: val}))}
                                  maxLength={200}
                              />
                              <ActionButton
                                  onClickBtn={openSpotLocationMap}
                                  btnDisplayText={'Set spot location'}
                              />
                              <Spacer />
                              <AddPhotoInput
                                  setPhotoData={setPhoto}
                              />
                              <Spacer />
                              <Checkbox
                                  isChecked={newSpot.is_private || false}
                                  onCheck={(checked) => dispatch(setNewSpotModelData({propertyKey: 'is_private', value: !newSpot.is_private}))}
                                  label={'Private spot?'}
                              />
                          </ScrollView>
                      </View>
                      <ActionButton
                          btnDisplayText={"Submit Spot"}
                          onClickBtn={submitSpot}
                          btnDisabled={submitDisabled}
                      />
                  </View>
              </TouchableWithoutFeedback>
          </>
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
