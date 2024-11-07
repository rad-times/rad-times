import {DisplayTextStateProp} from "@/state/displayLanguageSlice";
import {CheckInBtn} from "@/views/checkIn/CheckInBtn";
import PageTitle from "@/views/components/PageTitle";
import Spacer from "@/views/components/Spacer";
import {FriendsActiveBox} from "@/views/FriendsActiveBox";
import {ReactNode} from "react";
import {useSelector} from "react-redux";

export default function UserHome():ReactNode {
  const displayText = useSelector((state: DisplayTextStateProp) => state.displayText.displayTextJson);

  return (
    <>
      <PageTitle
        title={displayText.index.title}
      />
      <Spacer />
      <FriendsActiveBox />
      <Spacer />
      <CheckInBtn />
    </>
  );
}
