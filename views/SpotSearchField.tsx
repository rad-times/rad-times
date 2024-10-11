import {ActiveUserStateProp} from "@/state/activeUserSlice";
import {setSearchResults} from "@/state/spotSlice";
import {Person} from "@/types/Person";
import {useDispatch, useSelector} from "react-redux";
import {fetchSpotsByName} from "@/api/spotApi";
import React, {ReactNode, useEffect, useState} from "react";
import FilterableSearchBar from "@/views/FilterableSearchBar";

export default function SpotSearchField(): ReactNode {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const activeUser:Person = useSelector((state: ActiveUserStateProp) => state.activeUser.user);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSpotsByName(searchTerm, activeUser.id)
        .then(resp => {
          dispatch(setSearchResults(resp));
        });
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSearchInputChange = (inputValue: string) => {
    setSearchTerm(inputValue);
  }

  const handleClearSearchTerm = () => {
    setSearchTerm('');
  }

  return (
    <FilterableSearchBar
      searchTerm={searchTerm}
      handleChange={handleSearchInputChange}
      clearSearchTerm={handleClearSearchTerm}
    />
  );
};
