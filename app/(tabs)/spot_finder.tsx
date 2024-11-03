import {View, FlatList, StyleSheet} from "react-native";

import PageTitle from "@/components/atom/PageTitle";
import {Colors} from "@/constants/Colors";
import SpotSearchField from "@/components/SpotSearchField";
import {useSelector} from "react-redux";
import {SpotSearchResults} from "@/state/spotSearchSlice";
import SpotListingItem from "@/components/SpotListingItem";

type SpotSearchState = {
  spotSearch: SpotSearchResults
}

export default function SpotFinder() {
  const searchResultsList = useSelector((state: SpotSearchState) => state.spotSearch.searchResults);

  return (
    <View style={styles.main}>
      <PageTitle
        title={"SPOT CHECK"}
      />
      <SpotSearchField />
      <View style={styles.resultsWrapper}>
        <FlatList
          data={searchResultsList}
          renderItem={({item}) => <SpotListingItem spotDetails={item} />}
          keyExtractor={item => String(item.spot_id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.BLACK
  },
  resultsWrapper: {
    margin: 20
  }
});
