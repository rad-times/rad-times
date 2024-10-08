import {ReactNode} from "react";
import {View} from "react-native";

interface SpacerProps {
  margin?: number
}

export default function Spacer({
  margin = 20
}: SpacerProps): ReactNode {
  return (
    <View style={{marginBottom: margin}} />
  )
}
