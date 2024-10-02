import {View, Text, StyleSheet, Image, Pressable} from "react-native";
import {Colors} from "@/constants/Colors";

import Icon from "@/components/atom/Icon";
import {Person} from "@/types/Person";
import _ from "lodash";

interface CrewListItemProps {
  personDetail: Person
}

function CrewListItem({
  personDetail
}: CrewListItemProps) {

  const onPressFavorite = () => {
    console.log('favorite');
  }

  const getPersonImageContent = (imagePath = '') => {
    if (!_.isEmpty(imagePath)) {
      return (
        <Image
          style={styles.personImage}
          source={{
            uri: personDetail.profile_image
          }}
        />
      );
    }

    return (
      <View style={styles.personImage}>
        <View style={styles.personImageMissing}>
          <Icon size={24} name="image-sharp" color={Colors.DARK_GREY} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mainWrapper}>
      {getPersonImageContent(personDetail.profile_image)}
      <View style={styles.personInformationBlock}>
        <Text style={styles.personNameText}>{personDetail.first_name} {personDetail.last_name}</Text>
        <Text style={styles.personLocationText}>{personDetail.location?.city_name}, {personDetail.location?.state_name}</Text>
        <Text style={styles.personLocationText}>{personDetail.location?.country_name}</Text>
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
      </View>
    </View>
  );
}

const CONTAINER_HEIGHT = 70;

const styles = StyleSheet.create({
  mainWrapper: {
    cursor: 'pointer',
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
  personImage: {
    width: 80,
    borderRightColor: Colors.LIGHT_GREY,
    borderRightWidth: 2,
    height: CONTAINER_HEIGHT
  },
  personImageMissing: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: CONTAINER_HEIGHT
  },
  personInformationBlock: {
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
  personNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.DARK_GREY,
    paddingBottom: 2
  },
  personLocationText: {
    fontSize: 12,
    fontStyle: 'italic',
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
    height: CONTAINER_HEIGHT,
    width: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default CrewListItem;
