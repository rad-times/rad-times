import {Colors} from "@/constants/Colors";
import FormInput from "@/views/components/FormInput";
import FormLabel from "@/views/components/FormLabel";
import Icon from "@/views/components/Icon";
import PageWrapper from "@/views/components/PageWrapper";
import {ReactNode, useState} from "react";
import {
  FlatList,
  GestureResponderEvent,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import _ from 'lodash';

type SearchablePickerProps = {
  // Form Label
  label?: string
  // The value the user entered into the input field (from state)
  searchValue: string
  // List of results to show in the dropdown
  searchResults: Array<any>
  // When the users updates the input
  onChangeSearchText: (text: string) => void
  // When the user hits the X to clear the input field
  clearSearchValue: (event: GestureResponderEvent) => void
  // When the user selects an option from the dropdown list
  onSelectOption: (optionId: any) => void
  // Key to find the dropdown option display value
  itemDisplayValueKey: string
  // Key to find the dropdown option's ID
  itemIdKey: string
}

type SearchableDropdownItemProps = {
  // Display text in the dropdown option
  displayValue: string
  // ID of the given option
  itemId: any
  // Callback when the user clicks on an option
  onSelectOption: (e: GestureResponderEvent) => void
}

/**
 * Individual option in the searchable list
 */
function SearchableDropdownItem(
  {
    displayValue,
    itemId,
    onSelectOption
}: SearchableDropdownItemProps) {
  return (
    <Pressable
      style={styles.dropdownItemWrapper}
      onPress={(e) => onSelectOption(itemId)}
    >
      <Text style={styles.dropdownItemText}>{displayValue}</Text>
    </Pressable>
  );
}

/**
 * A searchable select view
 */
export default function SearchablePicker(
  {
    label,
    searchValue,
    searchResults,
    onChangeSearchText,
    clearSearchValue,
    onSelectOption,
    itemDisplayValueKey,
    itemIdKey
}: SearchablePickerProps): ReactNode {
  const [pickerModalShown, showPickerModal] = useState(false);
  const [initialSearchValue, resetInitialSearchValue] = useState(searchValue);

  const onSelectItem = (targetOptionId: any) => {
    showPickerModal(false);
    resetInitialSearchValue(searchValue);
    onSelectOption(targetOptionId);
  };

  const onClickCloseModal = (e: GestureResponderEvent) => {
   onChangeSearchText(initialSearchValue);
   showPickerModal(false);
  };

  return (
    <View>
      {!_.isNil(label) &&
          <FormLabel labelText={label} />
      }
      <FormInput
        formValue={searchValue}
        onFocus={() => showPickerModal(true)}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={pickerModalShown}
      >
        <SafeAreaView style={styles.contentWrapper}>
          <View style={styles.topBar}>
            <Text style={styles.searchableModalTopBarText}>{label || ''}</Text>
            <Pressable
              onPress={onClickCloseModal}>
              <Icon size={30} name="close-circle-outline" color={Colors.WHITE} />
            </Pressable>
          </View>
          <PageWrapper>
            <FormInput
              onChangeInput={onChangeSearchText}
              formValue={searchValue}
              autoCorrect={false}
              clearField={clearSearchValue}
              autoFocus={true}
            />
            {searchResults.length > 0 &&
                <View style={styles.resultsWrapper}>
                    <FlatList
                        data={searchResults}
                        renderItem={({item}) => <SearchableDropdownItem displayValue={item[itemDisplayValueKey]} itemId={item[itemIdKey]} onSelectOption={onSelectItem} />}
                        keyExtractor={item => String(item.place_id)}
                    />
                </View>
            }
          </PageWrapper>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  topBar: {
    height: 50,
    backgroundColor: Colors.DARK_GREY,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  searchableModalTopBarText: {
    color: Colors.WHITE,
    fontSize: 18
  },
  input: {
    height: 40,
    padding: 5,
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: 5,
    borderColor: Colors.WHITE,
    borderWidth: 2,
    fontSize: 18
  },
  resultsWrapper: {
    marginTop: -3
  },
  resultsTop: {
    height: 5,
    backgroundColor: Colors.LIGHT_GREY,
    borderTopWidth: 1,
    borderTopColor: Colors.WHITE,
    borderBottomWidth: 0,
    borderRadius: 5
  },
  resultsBottom: {
    height: 5,
    backgroundColor: Colors.LIGHT_GREY,
    borderBottomWidth: 1,
    borderBottomColor: Colors.WHITE,
    borderTopWidth: 0,
    borderRadius: 5
  },
  dropdownItemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderLeftWidth: 1,
    borderLeftColor: Colors.WHITE,
    borderRightWidth: 1,
    borderRightColor: Colors.WHITE,
    borderBottomColor: Colors.GREY,
    borderBottomWidth: 1,
    height: 40
  },
  dropdownItemText: {
    color: Colors.DARK_GREY,
    fontSize: 14
  }
});
