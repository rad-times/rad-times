import {View, Text, StyleSheet, Image, Pressable} from "react-native";
import {Colors} from "@/constants/Colors";
import {Spot} from "@/types/Spot";
import Icon from "@/components/atom/Icon";
import _ from 'lodash';

type SpotListingItemProps = {
  spotDetails: Spot
}

function SpotListingItem({
  spotDetails
}: SpotListingItemProps) {
  const onPressFavorite = () => {
    console.log('favorite');
  }

  const onPressMap = () => {
    console.log('map');
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
      <View style={styles.spotInformationBlock}>
        <Text style={styles.spotNameText}>{spotDetails.spot_name}</Text>
        <Text style={styles.spotDescriptionText}>{spotDetails.spot_description}</Text>
      </View>

      <View style={styles.iconBlock}>
        <Pressable
          onPress={onPressFavorite}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? Colors.LIGHT_GREY : Colors.WHITE,
            },
            styles.icon,
          ]}>
          <Icon size={24} name="star-outline" color={Colors.DARK_GREY} />
        </Pressable>

        <Pressable
          onPress={onPressMap}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? Colors.LIGHT_GREY : Colors.WHITE,
            },
            styles.icon,
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
