import {setSearchResults} from "@/state/spotSlice";
import {useDispatch} from "react-redux";
import {fetchSpotsByName} from "@/api/spotApi";
import React, {ReactNode, useEffect, useState} from "react";
import FilterableSearchBar from "@/views/FilterableSearchBar";

export default function SpotSearchField(): ReactNode {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSpotsByName(searchTerm)
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
