import {getLocationData, searchGooglePlaces} from "@/api/googlePlacesApi";
import {Colors} from "@/constants/Colors";
import {BOTTOM_BUTTON, CONTENT_FULL_PAGE} from "@/constants/Styles";
import {useAuthSession} from "@/providers/AuthProvider";
import {ActiveUserStateProp} from "@/state/activeUserSlice";
import {GoogleLocationStateProps, setSearchInput, setSearchResults} from "@/state/googleLocationsSlice";
import ActionButton from "@/views/components/ActionButton";
import FormInput from "@/views/components/FormInput";
import SearchablePicker, {SelectResponse} from "@/views/components/SearchablePicker";
import Spacer from "@/views/components/Spacer";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {router} from "expo-router";;
import {ReactNode, useEffect, useState} from "react";
import PageWrapper from "@/views/components/PageWrapper";
import PageTitle from "@/views/components/PageTitle";
import {View} from 'react-native';
import { Snackbar, ActivityIndicator } from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";

interface EditProfileProps {}

export default function EditProfile({}: EditProfileProps): ReactNode {
  const dispatch = useDispatch();
  const queryClient = useQueryClient()
  const {token} = useAuthSession();

  const locationSearchTerm = useSelector((state: GoogleLocationStateProps) => state.googleLocationSearch.locationSearchTerm);
  const searchResults = useSelector((state: GoogleLocationStateProps) => state.googleLocationSearch.locationSearchResults);
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);
  const [editedUser, setEditedUser] = useState(activeUser);
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [hasUpdateError, setHasUpdateError] = useState<boolean>(false);

  const onChangeFormElement = (key: string, val: string) => {
    setEditedUser({
      ...editedUser,
      [key]: val
    });

    setHasChanges(true);
  };

  // Set initial state
  useEffect(() => {
    dispatch(setSearchInput(`${editedUser.location?.city_name}, ${editedUser.location?.state_name}, ${editedUser.location?.country_name}`));
  }, []);

  useEffect(() => {
    // if (locationSearchTerm === '') {
    //   dispatch(setSearchResults([]));
    //   return;
    // }
    //
    // const debounceTimer = setTimeout(() => {
    //   searchGooglePlaces(locationSearchTerm)
    //     .then(res => dispatch(setSearchResults(res)))
    // }, 500);
    // return () => clearTimeout(debounceTimer);
  }, [locationSearchTerm]);

  const setLocationSearchValue = (val: string) => {
    dispatch(setSearchInput(val));
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
        city_name: fullLocation.addressComponents[0].longText,
        state_name: fullLocation.addressComponents[2].longText,
        country_name: fullLocation.addressComponents[3].longText
    };
    setEditedUser({
      ...editedUser,
      location: updatedLocation
    });
  }

  const mutation = useMutation({
    mutationFn: async () => {
      return fetch(`http://localhost:8080/users/${activeUser.id}`, {
        method: "PUT",
        body: JSON.stringify({
          first_name: editedUser.first_name,
          last_name: editedUser.last_name,
          bio: editedUser.bio
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token?.current}`
        }
      })
        .then(resp => resp.json())
        .then(() => {
          if (mutation.isSuccess) {
            router.back();
          }
        })
        .catch(err => console.error(err));
    },
  })

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
    <PageWrapper>
      <PageTitle
        title={"Edit My Profile"}
      />
      <>
        {mutation.isPending ? (
          <View style={CONTENT_FULL_PAGE}>
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
                {/*<SearchablePicker*/}
                {/*  label={"Location"}*/}
                {/*  searchValue={locationSearchTerm}*/}
                {/*  searchResults={searchResults}*/}
                {/*  onChangeSearchText={(val: string) => setLocationSearchValue(val)}*/}
                {/*  onSelectOption={onSelectLocation}*/}
                {/*  clearSearchValue={() => setLocationSearchValue('')}*/}
                {/*  itemDisplayValueKey={'location_name'}*/}
                {/*  itemIdKey={'place_id'}*/}
                {/*/>*/}
              </View>

              <View style={BOTTOM_BUTTON}>
                <ActionButton onClickBtn={() => mutation.mutate()} btnDisabled={!hasChanges} btnWidthPercent={50} theme={"actionBtn"} btnDisplayText={"Save"} />
                <ActionButton onClickBtn={cancelChanges} btnWidthPercent={50} theme={"destroyBtn"} btnDisplayText={"Cancel"} />
              </View>
            </>
        )}
      </>

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
        {mutation?.error?.message || ""}
      </Snackbar>

    </PageWrapper>
  );
}
