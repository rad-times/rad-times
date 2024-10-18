import {IActiveFriendsState} from "@/state/activeFriendsSlice";
import {DisplayTextStateProp} from "@/state/displayLanguageSlice";
import ActionButton from "@/views/components/ActionButton";
import CheckInModal from '@/views/CheckInModal';
import {ReactNode, useState} from "react";
import {Modal} from "react-native";
import {useSelector} from "react-redux";

/**
 *
 */
export function CheckInBtn({}): ReactNode {
  const activeUserIsCheckedIn = useSelector((state: IActiveFriendsState) => state.activeFriends.activeUserIsCheckedIn);
  const displayText = useSelector((state: DisplayTextStateProp) => state.displayText.displayTextJson);
  const [checkInModalShown, showCheckInModal] = useState(false);

  return (
    <>
      <ActionButton onClickBtn={() => showCheckInModal(true)} btnDisplayText={activeUserIsCheckedIn ? displayText.index.checkOutBtn : displayText.index.checkInBtn} />
      <Modal
        animationType="slide"
        transparent={false}
        visible={checkInModalShown}
      >
        <CheckInModal
          showCheckInModal={showCheckInModal}
        />
      </Modal>
    </>
  );
};
