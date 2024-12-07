import {DisplayTextStateProp} from "@/state/displayLanguageSlice";
import {CheckInBtn} from "@/views/checkIn/CheckInBtn";
import PageTitle from "@/views/components/PageTitle";
import Spacer from "@/views/components/Spacer";
import {FriendsActiveBox} from "@/views/FriendsActiveBox";
import PageWrapper from "@/views/components/PageWrapper";
import {ReactNode, useContext} from "react";
import {useSelector} from "react-redux";

export default function Index(): ReactNode {
  const displayText = useSelector((state: DisplayTextStateProp) => state.displayText.displayTextJson);

  return (
    <PageWrapper>
      <>
      </>
    </PageWrapper>
  );
}
