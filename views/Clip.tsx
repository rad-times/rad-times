import {Colors} from "@/constants/Colors";
import {ReactNode} from "react";
import {Image, StyleSheet, View} from "react-native";

interface IClip {
  details: object
}

export default function Clip({
  details
}:IClip): ReactNode {
  return (
    <View style={styles.wrapper}>
      <View style={styles.clipFrame}>
        <Image
          style={styles.clipThumb}
          source={{
            uri: details.imageUrl
          }}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  clipFrame: {
    width: '90%',
    aspectRatio : 1 / 1,
    backgroundColor: Colors.LIGHT_GREY,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'flex-start'
  },
  clipThumb: {
    marginTop: 10,
    width: '90%',
    height: '80%',
    borderWidth: 1,
    borderColor: Colors.GREY
  }
});
