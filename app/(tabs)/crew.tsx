import {View, Text, StyleSheet, FlatList} from "react-native";
import {Colors} from "@/constants/Colors";
import PageTitle from "@/components/atom/PageTitle";
import CrewSearchField from "@/components/CrewSearchField";
import {useSelector} from "react-redux";
import CrewListItem from "@/components/CrewListItem";
import {CrewListState} from "@/state/crewSearchSlice";


export default function crew() {
  const currentCrewSearchTerm = useSelector((state: CrewListState) => state.crew.searchTerm);
  const crewList = useSelector((state: CrewListState) => state.crew.crewList);

  return (
    <View style={styles.container}>
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

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.BLACK
  },
  resultsWrapper: {
    margin: 20
  },
  colorWhite: {
    color: Colors.WHITE
  }
});
