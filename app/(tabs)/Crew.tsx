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
        title={"THE CREW"}
      />
      <CrewSearchField />
      <View style={styles.resultsWrapper}>
        <FlatList
          data={currentCrewSearchTerm ? crewList.filter(person => `${person.first_name?.toLowerCase()} ${person.last_name?.toLowerCase()}`.includes(currentCrewSearchTerm)) : crewList}
          renderItem={({item}) => <CrewListItem personDetail={item} />}
          keyExtractor={item => String(item.id)}
        />
      </View>

    </PageWrapper>
  );
}
const styles = StyleSheet.create({
  resultsWrapper: {
    marginTop: 20
  },
  colorWhite: {
    color: Colors.WHITE
  }
});
