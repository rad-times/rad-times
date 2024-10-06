import {Pressable, StyleSheet, TextInput, View} from "react-native";
import Icon from "@/views/components/Icon";
import {Colors} from "@/constants/Colors";
import FiltersBtn from "@/views/components/FilterBtn";
import {ReactNode} from "react";

interface FilterableSearchBarProps {
  searchTerm: string,
  handleChange: Function
  clearSearchTerm: Function
}

export default function FilterableSearchBar({
  searchTerm,
  handleChange,
  clearSearchTerm
}: FilterableSearchBarProps): ReactNode {
  return (
    <View style={styles.contentWrapper}>
      <View style={styles.inputCombo}>
        <View style={styles.iconContainer}>
          <Icon size={24} name="search" color={Colors.DARK_GREY} />
        </View>
        <TextInput
          onChangeText={(updatedText) => {
            if (handleChange) {
              handleChange(updatedText);
            }
          }}
          value={searchTerm}
          style={styles.inputContainer}
        />
        <Pressable
          style={styles.iconContainer}
          onPress={() => clearSearchTerm()}
        >
          <Icon size={24} name="close" color={Colors.DARK_GREY} />
        </Pressable>
        <FiltersBtn
          onPress={() => {
            console.log('filter');
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentWrapper: {
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20
  },
  inputCombo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconContainer: {
    height: 40,
    width: 30,
    backgroundColor: Colors.LIGHT_GREY,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    flex: 1
  }
});
