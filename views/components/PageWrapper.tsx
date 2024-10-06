import {ReactNode} from "react";
import {StyleSheet, View} from "react-native";
import {Colors} from "@/constants/Colors";

interface PageWrapperProps {
  children: ReactNode
}

export default function PageWrapper({children}: PageWrapperProps): ReactNode {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.BLACK,
    padding: 20,
    color: Colors.WHITE
  }
});
