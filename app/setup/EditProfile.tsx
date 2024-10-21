import {getLocationData, searchGooglePlaces} from "@/api/googlePlacesApi";
import {Colors} from "@/constants/Colors";
import {ActiveUserStateProp} from "@/state/activeUserSlice";
import {GoogleLocationStateProps, setSearchInput, setSearchResults} from "@/state/googleLocationsSlice";
import ActionButton from "@/views/components/ActionButton";
import FormInput_OLD from "@/views/components/FormInput_OLD";
import FormLabel from "@/views/components/FormLabel";
import SearchablePicker, {SelectResponse} from "@/views/components/SearchablePicker";
import Spacer from "@/views/components/Spacer";
import {ReactNode, useEffect, useState} from "react";
import PageWrapper from "@/views/components/PageWrapper";
import PageTitle from "@/views/components/PageTitle";
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from "react-redux";

interface EditProfileProps {}

interface FormElementBlockProps {
  label: string
  value: string | undefined
  onChange: Function
  isMultiline?: boolean
  maxLength?: number
  autoCorrect?: boolean
}

const FormElementBlock = ({
    label,
    value = '',
    onChange,
    isMultiline = false,
    maxLength,
    autoCorrect = false
}: FormElementBlockProps) => {
  return (
    <>
      <FormLabel labelText={label} />
      <FormInput_OLD
        formValue={value}
        onChangeInput={onChange}
        isMultiline={isMultiline}
        maxLength={maxLength}
        autoCorrect={autoCorrect}
      />
    </>
  );
};

export default function EditProfile({}: EditProfileProps): ReactNode {
  const dispatch = useDispatch();

  const locationSearchTerm = useSelector((state: GoogleLocationStateProps) => state.googleLocationSearch.locationSearchTerm);
  const searchResults = useSelector((state: GoogleLocationStateProps) => state.googleLocationSearch.locationSearchResults);
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);
  const [editedUser, setEditedUser] = useState(activeUser);
  const [changeList, setChangeList] = useState({})

  const onChangeFirstName = (val: string) => {
    setEditedUser({
      ...editedUser,
      first_name: val
    });
    setChangeList({
      ...changeList,
      first_name: val
    });
  };

  const onChangeLastName = (val: string) => {
    setEditedUser({
      ...editedUser,
      last_name: val
    });
    setChangeList({
      ...changeList,
      first_name: val
    });
  };

  const onChangeBio = (val: string) => {
    setEditedUser({
      ...editedUser,
      bio: val
    });
    setChangeList({
      ...changeList,
      first_name: val
    });
  };

  // Set initial state
  useEffect(() => {
    dispatch(setSearchInput(`${editedUser.location?.city_name}, ${editedUser.location?.state_name}, ${editedUser.location?.country_name}`));
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
    setChangeList({
      ...changeList,
      location: updatedLocation
    });
  }

  const saveChanges = () => {
    console.log('saving');
  }

  return (
    <PageWrapper>
      <PageTitle
        title={"Edit My Profile"}
      />
      <Spacer />
      <FormElementBlock
        label={'First Name'}
        value={editedUser.first_name}
        onChange={onChangeFirstName}
      />
      <Spacer />
      <FormElementBlock
        label={'Last Name'}
        value={editedUser.last_name}
        onChange={onChangeLastName}
      />
      <Spacer />
      <FormElementBlock
        label={'Bio'}
        value={editedUser.bio}
        onChange={onChangeBio}
        isMultiline={true}
        maxLength={255}
        autoCorrect={true}
      />
      <Spacer />
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
      <Spacer margin={50} />
      <ActionButton onClickBtn={saveChanges} btnDisplayText={"Save"} />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  formLabel: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 5,
    color: Colors.LIGHT_GREY
  }
});
