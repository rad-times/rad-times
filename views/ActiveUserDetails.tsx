import {View, Text, StyleSheet, Image} from "react-native";
import {Colors} from "@/constants/Colors";
import {useSelector} from "react-redux";
import {ActiveUserStateProp} from '@/state/activeUserSlice';
import {ReactNode} from "react";
import _ from 'lodash';

export type ActiveUserDetailProps = {};

function ActiveUserDetails({}: ActiveUserDetailProps): ReactNode {
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);
  const usersLocation = _.isEmpty(activeUser.location) ? "From Unknown Regions" : `${activeUser.location?.city_name}, ${activeUser.location?.state_name}`;

  return (
    <View style={styles.mainWrapper}>
      <Image
        style={styles.profileImage}
        source={{
          uri: activeUser.profile_image
      }}
      />
      <View style={styles.detailsWrapper}>
        <Text style={styles.userName}>{activeUser.first_name} {activeUser.last_name}</Text>
        <Text style={styles.locationText}>{usersLocation}</Text>
        <Text style={styles.countryText}>{activeUser.location?.country_name}</Text>
        <Text style={styles.bioText}>{activeUser.bio}</Text>
      </View>
    </View>
  );
}

const HEIGHT = 120;
const styles = StyleSheet.create({
  mainWrapper: {
    height: HEIGHT,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  detailsWrapper: {
    height: HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1
  },
  profileImage: {
    height: HEIGHT,
    width: 120,
    borderWidth: 2,
    borderColor: Colors.DARK_GREY,
    marginRight: 10
  },
  userName: {
    color: Colors.LIGHT_GREY,
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 5
  },
  bioText: {
    color: Colors.LIGHT_GREY,
    fontSize: 12,
    fontWeight: 'normal'
  },
  locationText: {
    color: Colors.LIGHT_GREY,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'italic'
  },
  countryText: {
    color: Colors.GREY,
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'italic',
    paddingBottom: 7
  }
});

export default ActiveUserDetails;
