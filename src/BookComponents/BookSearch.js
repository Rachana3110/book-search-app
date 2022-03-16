import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import SearchBar from "./SearchBar";
import DisplayTable from "./DisplayTable";

//styles for BookSearch Component
const useStyles = makeStyles({});

function BookSearch() {
  const classes = useStyles();
  //React hook is used to initialize current state and changed state value
  const [search, setSearch] = useState("");

  //function to handle filtering of searched Book title in search bar
  const searchHandler = (searchData) => {
    setSearch(searchData);
  };

  return (
    <>
      <div>
        {/* Search Bar to search for books using Book Title */}
        <SearchBar term={search} searchKeyword={searchHandler} />
        <DisplayTable search={search} />
      </div>
    </>
  );
}

export default BookSearch;
