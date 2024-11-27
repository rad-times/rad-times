import {ReactNode} from "react";
import {StyleSheet, View} from "react-native";
import {Colors} from "@/constants/Colors";

interface PageWrapperProps {
  children: ReactNode
}

export default function PageWrapper({children}: PageWrapperProps): ReactNode {
  return (
    <View style={styles.container}>
      <View style={styles.innerWrapper}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: Colors.BLACK
  },
  innerWrapper: {
    padding: 20,
    flex: 1
  }
});
