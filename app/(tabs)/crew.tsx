import {View, Text, StyleSheet, FlatList} from "react-native";
import {Colors} from "@/constants/Colors";
import PageTitle from "@/components/atom/PageTitle";
import {Person} from '@/types/Person';
import CrewSearchField from "@/components/CrewSearchField";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ActiveUserStateProp} from "@/state/activeUserSlice";
import CrewListItem from "@/components/CrewListItem";
import {CrewSearchResultsState} from "@/state/crewSearchSlice";


export default function crew() {
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);
  const currentCrewSearchTerm = useSelector((state: CrewSearchResultsState) => state.crewSearch.searchTerm);
  const [crewList, setCrewList] = useState<Person[]>(activeUser.crew || []);

  useEffect(() => {
    const crewList = activeUser.crew || [];


    if (crewList.length === 0 || currentCrewSearchTerm === '') {
      setCrewList(crewList)
    }

    setCrewList(crewList.filter(crew => {
      return `${crew.first_name.toLowerCase()} ${crew.last_name.toLowerCase()}`.includes(currentCrewSearchTerm);
    }));
  }, [activeUser, currentCrewSearchTerm]);


  return (
    <View style={styles.container}>
      <PageTitle
        title={"THE CREW"}
      />
      <CrewSearchField />
      <View style={styles.resultsWrapper}>
        {!crewList.length &&
            <Text>Loading</Text>
        }

        {crewList.length &&
          <FlatList
            data={crewList}
            renderItem={({item}) => <CrewListItem personDetail={item} />}
            keyExtractor={item => String(item.id)}
          />
        }
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
  }
});
