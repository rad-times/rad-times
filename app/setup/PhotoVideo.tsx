import {Colors} from "@/constants/Colors";
import {
  GoogleLocationStateProps,
  setSearchInput,
  setSearchResults
} from "@/state/googleLocationsSlice";
import SearchablePicker from "@/views/components/SearchablePicker";
import Spacer from "@/views/components/Spacer";
import {ReactNode, useEffect} from "react";
import PageWrapper from "@/views/components/PageWrapper";
import PageTitle from "@/views/components/PageTitle";
import {
  getLocationData,
  searchGooglePlaces
} from '@/api/googlePlacesApi';
import {StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";

export default function PhotoVideo(): ReactNode {
  const dispatch = useDispatch();
  const locationSearchQuery = useSelector((state: GoogleLocationStateProps) => state.googleLocationSearch.locationSearchTerm);
  const searchResults = useSelector((state: GoogleLocationStateProps) => state.googleLocationSearch.locationSearchResults);

  useEffect(() => {
    if (locationSearchQuery === '') {
      dispatch(setSearchResults([]));
      return;
    }

    const debounceTimer = setTimeout(() => {
      searchGooglePlaces(locationSearchQuery)
        .then(res => dispatch(setSearchResults(res)))
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [locationSearchQuery]);

  const onSelectLocation = async (locationId:string) => {
    const fullLocation = await getLocationData(locationId);
    console.log('fullLocation', fullLocation);
  }

  return (
    <PageWrapper>
      <PageTitle
        title={"Session Footage"}
      />
      <Spacer />
      <SearchablePicker
        label={"Search for a location"}
        searchValue={locationSearchQuery}
        searchResults={searchResults}
        onChangeSearchText={(val: string) => dispatch(setSearchInput(val))}
        onSelectOption={onSelectLocation}
        clearSearchValue={() => dispatch(setSearchInput(''))}
        itemDisplayValueKey={'location_name'}
        itemIdKey={'place_id'}
      />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    padding: 5,
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: 5,
    borderColor: Colors.WHITE,
    borderWidth: 2,
    fontSize: 18
  }
});
