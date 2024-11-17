import {View, Text, StyleSheet, Image, Pressable, Modal} from "react-native";
import {Colors} from "@/constants/Colors";
import {Spot} from "@/types/Spot";
import Icon from "@/views/components/Icon";
import _ from 'lodash';
import {
  setSpotLocationMapShown,
  setCurrentSpotMapDetails,
  updateSpotFavorite,
  setSpotDetailsPageContent
} from "@/state/spotSlice";
import {useDispatch, useSelector} from "react-redux";
import {toggleFavoriteSpot} from "@/api/spotApi";
import {ActiveUserStateProp} from "@/state/activeUserSlice";
import {ReactNode} from "react";
import {useRouter} from "expo-router";

type SpotListingItemProps = {
  spotDetails: Spot
}

function SpotListingItem({
  spotDetails
}: SpotListingItemProps): ReactNode {
  const dispatch = useDispatch();
  const router = useRouter();

  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);

  const onPressFavorite = async () => {
    try {
      const toggleResp = await toggleFavoriteSpot(spotDetails.spot_id, activeUser.id, !spotDetails.is_favorite);
      dispatch(updateSpotFavorite({
        spotId: spotDetails.spot_id,
        isFavorite: toggleResp.is_favorite
      }));

    } catch (err) {
      console.log("What the fuck", err);
    }
  }

  const onPressMap = () => {
    dispatch(setCurrentSpotMapDetails(spotDetails));
    dispatch(setSpotLocationMapShown(true));
  }

  const loadSpotDetailsPage = () => {
    dispatch(setSpotDetailsPageContent(spotDetails));
    router.push('/spots/SpotDetails');
  }

  const getSpotImageContent = (imagePath = '') => {
    if (!_.isEmpty(imagePath)) {
      return (
        <Image
          style={styles.spotImage}
          source={{
            uri: spotDetails.spot_image
          }}
        />
      );
    }
    return (
      <View style={styles.spotImage}>
        <View style={styles.spotImageMissing}>
          <Icon size={24} name="image-sharp" color={Colors.DARK_GREY} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mainWrapper}>
      {getSpotImageContent(spotDetails.spot_image)}

      <Pressable
        style={styles.spotInformationBlock}
        onPress={loadSpotDetailsPage}
      >
        <Text style={styles.spotNameText}>{spotDetails.spot_name}</Text>
        <Text style={styles.spotDescriptionText}>{spotDetails.spot_description}</Text>
      </Pressable>

      <View style={styles.iconBlock}>
        <Pressable
          onPress={onPressFavorite}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? Colors.LIGHT_GREY : Colors.WHITE,
            },
            styles.icon
          ]}>
          <Icon size={24} name="star-outline" color={spotDetails.is_favorite ? Colors.YELLOW : Colors.DARK_GREY} />
        </Pressable>

        <Pressable
          onPress={onPressMap}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? Colors.LIGHT_GREY : Colors.WHITE,
            },
            styles.icon
          ]}>
          <Icon size={24} name="location-sharp" color={Colors.DARK_GREY} />
        </Pressable>
      </View>
    </View>
  );
}

const CONTAINER_HEIGHT = 80;
const styles = StyleSheet.create({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.LIGHT_GREY,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
    height: CONTAINER_HEIGHT,
    overflow: 'hidden',
    marginBottom: 10
  },
  spotImage: {
    width: 80,
    borderRightColor: Colors.LIGHT_GREY,
    borderRightWidth: 2,
    height: CONTAINER_HEIGHT
  },
  spotImageMissing: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: CONTAINER_HEIGHT
  },
  spotInformationBlock: {
    height: CONTAINER_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    paddingTop: 10
  },
  spotNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.DARK_GREY,
    paddingBottom: 7
  },
  spotDescriptionText: {
    fontSize: 14,
    color: Colors.DARK_GREY
  },
  iconBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: CONTAINER_HEIGHT,
    width: 50
  },
  icon: {
    height: 40,
    width: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default SpotListingItem;
