import {Spot} from "@/types/Spot";
import ActionButton from "@/views/components/ActionButton";
import CreateNewSpot from "@/app/spots/CreateNewSpot";
import {View, FlatList, StyleSheet, Modal} from "react-native";

import PageTitle from "@/views/components/PageTitle";
import SpotSearchField from "@/views/spots/SpotSearchField";
import {useDispatch, useSelector} from "react-redux";
import {setCreateNewSpotModalShown, SpotState} from "@/state/spotSlice";
import SpotListingItem from "@/views/spots/SpotListingItem";
import SpotMapModalContent from "@/views/spots/SpotMapModalContent";
import {ReactNode} from "react";
import PageWrapper from "@/views/components/PageWrapper";

export default function Spots(): ReactNode {
  const searchResultsList: Spot[] = useSelector((state: SpotState) => state.spotList.spotListing);
  const spotLocationMapShown: boolean = useSelector((state: SpotState) => state.spotList.spotLocationMapShown);
  const createNewSpotModalShown: boolean = useSelector((state: SpotState) => state.spotList.createNewSpotModalShown);

  const dispatch = useDispatch();

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

      <Modal
        animationType="slide"
        transparent={false}
        visible={createNewSpotModalShown}
      >
        <CreateNewSpot />
      </Modal>
      <View style={styles.spotResultContent}>
        <View>
          <SpotSearchField />
          <View style={styles.resultsWrapper}>
            <FlatList
              data={searchResultsList}
              renderItem={({item}) => <SpotListingItem spotDetails={item} />}
              keyExtractor={item => String(item.spot_id)}
            />
          </View>
        </View>
        <ActionButton link={'/spots/CreateNewSpot'} btnDisplayText={'Add a spot'} />
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
  },
  spotResultContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  }
});
