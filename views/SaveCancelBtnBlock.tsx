import {BOTTOM_BUTTON} from "@/constants/Styles";
import ActionButton from "@/views/components/ActionButton";
import React, {ReactNode} from "react";
import {View} from "react-native";

interface ISaveCancelBtnBlock {
  saveEnabled?: boolean
  saveAction: () => void
  cancelEnabled?: boolean
  cancelAction: () => void
}
export default function SaveCancelBtnBlock ({
  saveEnabled = true,
  saveAction,
  cancelEnabled = true,
  cancelAction
}:ISaveCancelBtnBlock):ReactNode {
  return (
    <View style={BOTTOM_BUTTON}>
      <ActionButton onClickBtn={saveAction} btnDisabled={!saveEnabled} btnWidthPercent={50} theme={"actionBtn"} btnDisplayText={"Save"} />
      <ActionButton onClickBtn={cancelAction} btnDisabled={!cancelEnabled} btnWidthPercent={50} theme={"destroyBtn"} btnDisplayText={"Cancel"} />
    </View>
  );
}
