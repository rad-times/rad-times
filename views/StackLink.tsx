import {Text, StyleSheet, View} from "react-native";
import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import {Link} from "expo-router";

interface StackLinkProps {
  title: string
  link: "/setup/EditProfile" | "/setup/PhotoVideo" | "/setup/Settings" | "/setup/SocialLinks"
}

const FONT_SIZE = 20;
const STACK_BAR_HEIGHT = 45;

export default function StackLink({
  title,
  link
}: StackLinkProps) {
  return (
      <Link
        push
        style={styles.stackLinkWrapper}
        href={{
          pathname: link
        }}
      >
        <View style={styles.linkContent}>
          <Text style={styles.stackLinkText}>{title}</Text>
          <Icon size={FONT_SIZE} name="chevron-forward-outline" color={Colors.WHITE} />
        </View>
      </Link>
  );
}

const styles = StyleSheet.create({
  stackLinkWrapper: {
    backgroundColor: Colors.GREY,
    height: STACK_BAR_HEIGHT,
    borderRadius: 5,
    borderColor: Colors.LIGHT_GREY,
    borderWidth: 1
  },
  linkContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: STACK_BAR_HEIGHT + 5,
    paddingRight: 10,
    paddingLeft: 10,
    lineHeight: FONT_SIZE
  },
  stackLinkText: {
    color: Colors.WHITE,
    fontSize: FONT_SIZE
  }
});
