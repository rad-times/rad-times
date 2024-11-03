import {setSearchTerm} from "@/state/crewSearchSlice";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import FilterableSearchBar from "@/components/FilterableSearchBar";

export default function CrewSearchField() {
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

  return (
    <FilterableSearchBar
      searchTerm={crewSearchTerm}
      handleChange={handleSearchInputChange}
    />
  );
};
