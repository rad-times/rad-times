import {Colors} from "@/constants/Colors";
import {setSpotDetailsPageContent, SpotState} from "@/state/spotSlice";
import PageWrapper from "@/views/components/PageWrapper";
import {useIsFocused} from "@react-navigation/core";
import {useFocusEffect} from "expo-router";
import {ReactNode, useCallback, useEffect} from "react";
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from "react-redux";

interface ISpotDetailsProps {
  params: string
}

export default function SpotDetails({
                                      params
}: ISpotDetailsProps): ReactNode {
  const dispatch = useDispatch();

  const pageContent = useSelector((state: SpotState) => state.spotList.spotDetailsPageContent)

  useFocusEffect(
    useCallback(() => {
      return () => {
        // Unset data when navigating away
        dispatch(setSpotDetailsPageContent(null));
      };
    }, [])
  );
  return (
    <PageWrapper>
      <View>
        <Text style={styles.testText}>
          {pageContent?.spot_name}
        </Text>
      </View>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  testText: {
    color: Colors.LIGHT_GREY
  }
});
