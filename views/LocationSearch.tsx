import {getLocationData} from "@/api/googlePlacesApi";
import {GoogleLocationStateProps, setSearchInput} from "@/state/googleLocationsSlice";
import {Geolocation} from "@/types/Geolocation";
import SearchablePicker, {SelectResponse} from "@/views/components/SearchablePicker";
import {ReactNode} from "react";
import {useDispatch, useSelector} from "react-redux";

interface ILocationSearch {
  onSelectLocation: (arg0: Geolocation) => void
  disabled?: boolean
}

export default function LocationSearch({
  onSelectLocation,
  disabled = false
}: ILocationSearch): ReactNode {
  const dispatch = useDispatch();
  const locationSearchTerm = useSelector((state: GoogleLocationStateProps) => state.googleLocationSearch.locationSearchTerm);
  const searchResults = useSelector((state: GoogleLocationStateProps) => state.googleLocationSearch.locationSearchResults);

  const setLocationSearchValue = (val: string) => {
    dispatch(setSearchInput(val));
  }

  const selectLocation = async ({
  id
}: SelectResponse) => {
    const fullLocation = await getLocationData(id);
    onSelectLocation({
      lat: fullLocation.location.latitude,
      lng: fullLocation.location.longitude,
      city_name: fullLocation.addressComponents[0].longText,
      state_name: fullLocation.addressComponents[2].longText,
      country_name: fullLocation.addressComponents[3].longText
    });
  }

  return (
    <SearchablePicker
      label={"Location"}
      disabled={disabled}
      searchValue={locationSearchTerm}
      searchResults={searchResults}
      onChangeSearchText={(val: string) => setLocationSearchValue(val)}
      onSelectOption={selectLocation}
      clearSearchValue={() => setLocationSearchValue('')}
      itemDisplayValueKey={'location_name'}
      itemIdKey={'place_id'}
    />
  );
}
