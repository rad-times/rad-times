import {getClipsByStartDate} from "@/api/clipApi";
import {Colors} from "@/constants/Colors";
import {CENTER_CONTENT_FULL_PAGE} from "@/constants/Styles";
import {useAuthSession} from "@/providers/AuthProvider";
import {ActiveUserStateProp} from "@/state/activeUserSlice";
import Clip from "@/views/Clip";
import HomeActionbar from "@/views/HomeActionbar";
import {useQuery} from "@tanstack/react-query";
import React, {ReactNode} from "react";
import {FlatList, View} from "react-native";
import {ActivityIndicator, Snackbar} from "react-native-paper";
import {useSelector} from "react-redux";

export default function Index(): ReactNode {
  const {token} = useAuthSession();
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['clips'],
    queryFn: async () => {
      return getClipsByStartDate({
        userId: activeUser.id,
        sessionToken: token?.current || ''
      });
    }
  });

  return (
    <>
      <HomeActionbar />
      {isPending &&
        <View style={CENTER_CONTENT_FULL_PAGE}>
            <ActivityIndicator
              size={"large"}
              color={Colors.WHITE}
            />
          </View>
      }

      {data?.length &&
        <View style={{backgroundColor: Colors.BLACK}}>
          <FlatList
            data={data}
            style={{
          }}
            renderItem={({item}) => <Clip details={item}/>}
            keyExtractor={item => String(item.id)}
          />
        </View>
      }

      <Snackbar
        visible={isError}
        onDismiss={() => {}}
        action={{
          label: "Dismiss",
          onPress: () => {

          },
        }}>
        {error?.message || "Error fetching footage."}
      </Snackbar>
    </>
  );
}
