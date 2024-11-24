import {BODY_TEXT} from "@/constants/Styles";
import {useAuthSession} from "@/providers/AuthProvider";
import ActionButton from "@/views/components/ActionButton";
import PageWrapper from "@/views/components/PageWrapper";
import Spacer from "@/views/components/Spacer";
import {router} from "expo-router";
import {View, Text} from "react-native";

export default function Logout() {
  const {signOut} = useAuthSession();

  const cancelSignOut = async () => {
    //@TODO - show a "log out" page below instead of an immediate redirect
    router.replace("/(authorized)/(tabs)/Setup")
  }

  return (
    <PageWrapper>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={BODY_TEXT}>End your session? You will need to sign back in to access your information.</Text>
        <Spacer/>
        <ActionButton btnDisplayText={"Yea"} onClickBtn={signOut} />
        <Spacer/>
        <ActionButton btnDisplayText={"Nah"} onClickBtn={cancelSignOut} />
      </View>
    </PageWrapper>
  );
}
