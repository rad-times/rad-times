import {DisplayTextStateProp} from "@/state/displayLanguageSlice";
import Spacer from "@/views/components/Spacer";
import {FriendsActiveBox} from "@/views/FriendsActiveBox";
import {StyleSheet} from "react-native";
import PageTitle from "@/views/components/PageTitle";
import {CheckInBtn} from "@/views/checkIn/CheckInBtn";
import {ReactNode} from "react";
import PageWrapper from "@/views/components/PageWrapper";
import {useSelector} from "react-redux";

export default function Index(): ReactNode {
  const displayText = useSelector((state: DisplayTextStateProp) => state.displayText.displayTextJson);

  return (
    <PageWrapper>
      <PageTitle
        title={displayText.index.title}
      />
      <Spacer />
      <FriendsActiveBox />
      <Spacer />
      <CheckInBtn />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({});
