import {CHECK_IN, CHECK_OUT} from "@/constants/SocketTypes";
import {WebSocketProvider} from "@/providers/WebSocketProvider";
import {
  IActiveFriendsState,
  setActiveUserIsCheckedIn,
  setCheckInModalOpen,
  setNumActiveFriends
} from "@/state/checkInAndActiveSlice";
import {ActiveUserStateProp} from "@/state/activeUserSlice";
import {DisplayTextStateProp} from "@/state/displayLanguageSlice";
import {createSocketMessage} from "@/utils/createSocketMessage";
import ActionButton from "@/views/components/ActionButton";
import CheckInModal from '@/views/checkIn/CheckInModal';
import {ReactNode, useContext, useEffect, useState} from "react";
import {GestureResponderEvent, Modal} from "react-native";
import {useDispatch, useSelector} from "react-redux";

/**
 *
 */
export function CheckInBtn({}): ReactNode {
  const activeUserIsCheckedIn = useSelector((state: IActiveFriendsState) => state.activeFriends.activeUserIsCheckedIn);
  const displayText = useSelector((state: DisplayTextStateProp) => state.displayText.displayTextJson);
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);
  const numFriendsActive = useSelector((state: IActiveFriendsState) => state.activeFriends.numFriendsActive);
  const checkInModalShown = useSelector((state: IActiveFriendsState) => state.activeFriends.checkInModalOpen);

  // @ts-ignore
  const {subscribe, unsubscribe, sendMessage} = useContext(WebSocketProvider);
  const dispatch = useDispatch();

  useEffect(() => {
    subscribe(CHECK_IN, () => {
      dispatch(setNumActiveFriends(numFriendsActive + 1));
    });

    subscribe(CHECK_OUT, () => {
      dispatch(setNumActiveFriends(numFriendsActive - 1));
    });

    return () => {
      unsubscribe(CHECK_IN);
      unsubscribe(CHECK_OUT);
    }
  }, [subscribe, unsubscribe, numFriendsActive]);

  const toggleCheckInStatus = (e: GestureResponderEvent) => {
    if (activeUserIsCheckedIn) {
      sendMessage(createSocketMessage(CHECK_OUT, activeUser.id));
      dispatch(setActiveUserIsCheckedIn(false));
      return;
    }

    dispatch(setCheckInModalOpen(true));
  }

  return (
    <>
      <ActionButton onClickBtn={toggleCheckInStatus} btnDisplayText={activeUserIsCheckedIn ? displayText.index.checkOutBtn : displayText.index.checkInBtn} />
      <Modal
        animationType="slide"
        transparent={false}
        visible={checkInModalShown}
      >
        <CheckInModal />
      </Modal>
    </>
  );
};
