import {setSearchTerm} from "@/state/crewSearchSlice";
import {useDispatch} from "react-redux";
import React, {ReactNode, useEffect, useState} from "react";
import FilterableSearchBar from "@/views/FilterableSearchBar";

export default function CrewSearchField(): ReactNode {
  const [crewSearchTerm, setSearchTermFromInput] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(setSearchTerm(crewSearchTerm.toLowerCase()));
    }, 250);

    return () => clearTimeout(debounceTimer);
  }, [crewSearchTerm]);

  const handleSearchInputChange = (inputValue: string) => {
    setSearchTermFromInput(inputValue);
  }

  const clearSearch = () => {
    setSearchTermFromInput('');
  }

  return (
    <FilterableSearchBar
      searchTerm={crewSearchTerm}
      handleChange={handleSearchInputChange}
      clearSearchTerm={clearSearch}
    />
  );
};
