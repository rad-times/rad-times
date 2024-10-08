import {Colors} from "@/constants/Colors";
import {SocialDetails} from "@/types/Person";
import Icon from "@/views/components/Icon";
import {Link} from "expo-router";
import {ReactNode} from "react";
import {View, Text, StyleSheet, Pressable} from "react-native";

interface SocialMediaLinkProps {
  socialDetails: SocialDetails
  editMode: boolean
  onClickEdit: Function
}

type SocialMediaTypes = 'logo-facebook' | 'logo-youtube' |'logo-instagram';
type MediaNames = 'Facebook' | 'YouTube' | 'Instagram';
const iconMap: {[key:string]: SocialMediaTypes} = {
  'FACEBOOK': 'logo-facebook',
  'YOUTUBE': 'logo-youtube',
  'INSTAGRAM': 'logo-instagram'
};
const nameMap: {[key:string]: MediaNames} = {
  'FACEBOOK': 'Facebook',
  'YOUTUBE': 'YouTube',
  'INSTAGRAM': 'Instagram'
};
const FONT_SIZE = 20;

export default function SocialMediaLink({
  socialDetails,
  editMode,
  onClickEdit
}: SocialMediaLinkProps): ReactNode {

  const iconName: SocialMediaTypes = iconMap[socialDetails.social_type] || 'thumbs-down-outline';
  const mediaName: MediaNames = nameMap[socialDetails.social_type];

  const linkGuts = (
    <View style={styles.socialLinkWrapper}>
      <View style={styles.socialNameIconWrapper}>
        <Icon size={24} name={iconName} color={Colors.DARK_GREY} />
        <Text style={styles.name}>{mediaName}</Text>
      </View>
      <Icon size={FONT_SIZE} name={editMode ? 'pencil-sharp' : 'chevron-forward-outline'} color={Colors.DARK_GREY} />
    </View>
  );
  const renderLink = () => {
    if (editMode) {
      return (
        <Pressable
          onPress={() => onClickEdit()}
        >
          {linkGuts}
        </Pressable>
      )
    }
    return (
      <Link href={socialDetails.url_link}>
        {linkGuts}
      </Link>
    )
  }
  return (
    <>
      {renderLink()}
    </>
  );
}

const styles = StyleSheet.create({
  socialLinkWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.LIGHT_GREY,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  socialNameIconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'flex-start'
  },
  name: {
    fontSize: FONT_SIZE,
    marginLeft: 10
  }
});
