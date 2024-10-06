import {View, FlatList, StyleSheet, Modal} from "react-native";

import PageTitle from "@/views/components/PageTitle";
import {Colors} from "@/constants/Colors";
import SpotSearchField from "@/views/SpotSearchField";
import {useSelector} from "react-redux";
import {SpotState} from "@/state/spotSlice";
import SpotListingItem from "@/views/SpotListingItem";
import SpotMapModalContent from "@/views/SpotMapModalContent";
import {ReactNode} from "react";
import PageWrapper from "@/views/components/PageWrapper";

export default function SpotFinder(): ReactNode {
  const searchResultsList = useSelector((state: SpotState) => state.spotList.spotListing);
  const spotLocationMapShown = useSelector((state: SpotState) => state.spotList.spotLocationMapShown);

  return (
    <PageWrapper>
      <PageTitle
        title={"SPOT CHECK"}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={spotLocationMapShown}
      >
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
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  resultsWrapper: {
    marginTop: 20
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
