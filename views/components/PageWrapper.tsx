import {ReactNode} from "react";
import {StyleSheet, View} from "react-native";
import {SafeAreaView } from 'react-native-safe-area-context';
import {Colors} from "@/constants/Colors";

interface PageWrapperProps {
  children: ReactNode
}

export default function PageWrapper({children}: PageWrapperProps): ReactNode {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerWrapper}>
        {children}
      </View>
    </SafeAreaView>
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
