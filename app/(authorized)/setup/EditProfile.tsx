import {getLocationData, searchGooglePlaces} from "@/api/googlePlacesApi";
import {updateUserById} from '@/api/personApi';
import {Colors} from "@/constants/Colors";
import {CENTER_CONTENT_FULL_PAGE, CONTENT_FULL_PAGE} from "@/constants/Styles";
import {useAuthSession} from "@/providers/AuthProvider";
import {ActiveUserStateProp, setActiveUser} from "@/state/activeUserSlice";
import {GoogleLocationStateProps, setSearchResults} from "@/state/googleLocationsSlice";

import FormInput from "@/views/components/FormInput";
import SearchablePicker, {SelectResponse} from "@/views/components/SearchablePicker";
import Spacer from "@/views/components/Spacer";
import SaveCancelBtnBlock from "@/views/SaveCancelBtnBlock";
import {useMutation} from "@tanstack/react-query";
import {router} from "expo-router";;
import {ReactNode, useEffect, useState} from "react";
import PageWrapper from "@/views/components/PageWrapper";
import PageTitle from "@/views/components/PageTitle";
import {View} from 'react-native';
import { Snackbar, ActivityIndicator } from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';

interface EditProfileProps {}

export default function EditProfile({}: EditProfileProps): ReactNode {
  const dispatch = useDispatch();
  const {token} = useAuthSession();

  const searchResults = useSelector((state: GoogleLocationStateProps) => state.googleLocationSearch.locationSearchResults);
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);
  const [editedUser, setEditedUser] = useState(activeUser);
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [hasUpdateError, setHasUpdateError] = useState<boolean>(false);
  const [locationSearchTerm, setLocationSearchTerm] = useState<string>("");

  const onChangeFormElement = (key: string, val: string) => {
    setEditedUser({
      ...editedUser,
      [key]: val
    });

    setHasChanges(true);
  };

  // Set initial state
  useEffect(() => {
    if (editedUser.location === null || _.isEmpty(editedUser.location)) {
      setLocationSearchTerm("");
      return;
    }

    setLocationSearchTerm(`${editedUser.location?.city_name}, ${editedUser.location?.state_name}, ${editedUser.location?.country_name}`);
  }, []);

  useEffect(() => {
    if (locationSearchTerm === '') {
      dispatch(setSearchResults([]));
      return;
    }

    const debounceTimer = setTimeout(() => {
      searchGooglePlaces(locationSearchTerm)
        .then(res => dispatch(setSearchResults(res)))
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [locationSearchTerm]);

  const setLocationSearchValue = (val: string) => {
    setLocationSearchTerm(val);
  }

  const onSelectLocation = async (
    {
      id
    }: SelectResponse
  ) => {
    const fullLocation = await getLocationData(id);
    const updatedLocation = {
      lat: fullLocation.location.latitude,
      lng: fullLocation.location.longitude,
      city_id: fullLocation.id,
      city_name: fullLocation.addressComponents[0].longText,
      state_name: fullLocation.addressComponents[2].longText,
      country_name: fullLocation.addressComponents[3].longText
    };

    setEditedUser({
      ...editedUser,
      location: updatedLocation
    });
    setLocationSearchTerm(`${updatedLocation.city_name}, ${updatedLocation.state_name}, ${updatedLocation.country_name}`);
    setHasChanges(true);
  }

  const mutation = useMutation({
    mutationFn: async () => {
      return updateUserById(activeUser.id, editedUser, token?.current || '')
    },
    onError: (error, variables, context) => {
      setHasUpdateError(true);
    },
    onSuccess: (data, variables, context) => {
      dispatch(setActiveUser(editedUser));
      router.back();
    }
  });

  useEffect(() => {
    if (mutation.isError) {
      setHasUpdateError(true);
      setTimeout(() => {
        setHasUpdateError(false);
      }, 5000);
    }
  }, [mutation.isError]);

  const cancelChanges = () => {
    setEditedUser(activeUser);
    router.back();
  }

  return (
    <>
      <PageWrapper>
        <PageTitle
          title={"Edit My Profile"}
        />
        <>
          {mutation.isPending ? (
            <View style={CENTER_CONTENT_FULL_PAGE}>
              <ActivityIndicator animating={true} size={"large"} color={Colors.WHITE} />
            </View>
          ) : (
            <>
              <View style={CONTENT_FULL_PAGE}>
                <Spacer />
                <FormInput
                  label={'First Name'}
                  formValue={editedUser.first_name}
                  onChangeInput={(val) => onChangeFormElement("first_name", val)}
                />
                <FormInput
                  label={'Last Name'}
                  formValue={editedUser.last_name}
                  onChangeInput={(val) => onChangeFormElement("last_name", val)}
                />
                <FormInput
                  label={'Bio'}
                  formValue={editedUser.bio}
                  onChangeInput={(val) => onChangeFormElement("bio", val)}
                  isMultiline={true}
                  maxLength={255}
                  autoCorrect={false}
                />
                <SearchablePicker
                  label={"Location"}
                  searchValue={locationSearchTerm}
                  searchResults={searchResults}
                  onChangeSearchText={(val: string) => setLocationSearchValue(val)}
                  onSelectOption={onSelectLocation}
                  clearSearchValue={() => setLocationSearchValue('')}
                  itemDisplayValueKey={'location_name'}
                  itemIdKey={'place_id'}
                />
              </View>

              <SaveCancelBtnBlock
                saveAction={mutation.mutate}
                saveEnabled={hasChanges}
                cancelAction={cancelChanges}
              />
            </>
          )}
        </>
      </PageWrapper>

      <Snackbar
        visible={hasUpdateError}
        onDismiss={() => {
          setHasUpdateError(false);
        }}
        action={{
          label: "Dismiss",
          onPress: () => {
            setHasUpdateError(false);
          },
        }}>
        {mutation?.error?.message || "Error updating user."}
      </Snackbar>
    </>
  );
}
