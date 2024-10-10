import {ActiveUserStateProp} from "@/state/activeUserSlice";
import {setSearchInput} from "@/state/googleLocationsSlice";
import SearchablePicker from "@/views/components/SearchablePicker";
import Spacer from "@/views/components/Spacer";
import {ReactNode} from "react";
import PageWrapper from "@/views/components/PageWrapper";
import PageTitle from "@/views/components/PageTitle";
import {useSelector} from "react-redux";

export default function Settings(): ReactNode {
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);
  const languageSupportOptions = [
    {
      name: 'English',
      value: 'EN'
    },
    {
      name: 'Spanish',
      value: 'SP'
    },
    {
      name: 'French',
      value: 'FR'
    }
  ];
  const usersLanguage = languageSupportOptions.find(lang => lang.value === activeUser.language_code)?.name || 'English';
  const onSelectLanguage = () => {

  };

  return (
    <PageWrapper>
      <PageTitle
        title={"Settings and Preferences"}
      />
      <Spacer />
      <SearchablePicker
        label={"Language"}
        searchValue={usersLanguage}
        searchResults={languageSupportOptions}
        onChangeSearchText={(val: string) => console.log(val)}
        onSelectOption={onSelectLanguage}
        clearSearchValue={() => console.log('clearing')}
        itemDisplayValueKey={'name'}
        itemIdKey={'value'}
      />
    </PageWrapper>
  );
}
