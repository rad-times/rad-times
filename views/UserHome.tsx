import {CheckInBtn} from "@/views/checkIn/CheckInBtn";
import Spacer from "@/views/components/Spacer";
import {FriendsActiveBox} from "@/views/FriendsActiveBox";
import {ReactNode} from "react";

export default function UserHome():ReactNode {
  return (
    <>
      <FriendsActiveBox />
      <Spacer />
      <CheckInBtn />
    </>
  );
}
