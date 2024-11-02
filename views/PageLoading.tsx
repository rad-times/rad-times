import {Colors} from "@/constants/Colors";
import {ReactNode} from "react";
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export default function PageLoading({}): ReactNode {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={Colors.WHITE} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
