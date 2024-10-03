import {View, FlatList, StyleSheet, Modal} from "react-native";

import PageTitle from "@/components/atom/PageTitle";
import {Colors} from "@/constants/Colors";
import SpotSearchField from "@/components/SpotSearchField";
import {useSelector} from "react-redux";
import {SpotState} from "@/state/spotSearchSlice";
import SpotListingItem from "@/components/SpotListingItem";
import SpotMapModalContent from "@/components/SpotMapModalContent";


export default function SpotFinder() {
  const searchResultsList = useSelector((state: SpotState) => state.spotSearch.searchResults);
  const spotLocationMapShown = useSelector((state: SpotState) => state.spotSearch.spotLocationMapShown);

  return (
    <View style={styles.main}>
      <PageTitle
        title={"SPOT CHECK"}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={spotLocationMapShown}
        onRequestClose={() => {
          console.log('closing');
        }}>
        <SpotMapModalContent />
      </Modal>

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
  },
  spotModalRegionHidden: {
    display: 'none'
  },
  spotModalRegion: {
    display: 'none',
    height: '90%',
    width: '90%'
  }
});
