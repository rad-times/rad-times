import Icon from "@/views/components/Icon";
import {View, Text, StyleSheet, FlatList} from "react-native";
import {Colors} from "@/constants/Colors";
import PageTitle from "@/views/components/PageTitle";
import CrewSearchField from "@/views/CrewSearchField";
import {useSelector} from "react-redux";
import CrewListItem from "@/views/CrewListItem";
import {CrewListState} from "@/state/crewSearchSlice";
import {ReactNode} from "react";
import PageWrapper from "@/views/components/PageWrapper";

export default function Crew(): ReactNode {
  const currentCrewSearchTerm = useSelector((state: CrewListState) => state.crew.searchTerm);
  const crewList = useSelector((state: CrewListState) => state.crew.crewList);

  return (
    <PageWrapper>
      <PageTitle
        title={"HOMIES"}
      />
      <CrewSearchField />
      <View style={styles.resultsWrapper}>
        <FlatList
          data={currentCrewSearchTerm ? crewList.filter(person => `${person.first_name?.toLowerCase()} ${person.last_name?.toLowerCase()}`.includes(currentCrewSearchTerm)) : crewList}
          renderItem={({item}) => <CrewListItem personDetail={item} />}
          keyExtractor={item => String(item.id)}
        />
      </View>
      <View style={styles.footerBtn}>
        <Icon size={50} name="add-circle-sharp" color={Colors.LIGHT_GREY} />
      </View>
    </PageWrapper>
  );
}
const styles = StyleSheet.create({
  resultsWrapper: {
    marginTop: 20,
    flex: 1
  },
  colorWhite: {
    color: Colors.WHITE
  },
  footerBtn: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  }
});
