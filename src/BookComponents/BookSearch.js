import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import SearchBar from "./SearchBar";
import DisplayTable from "./DisplayTable";

//styles for BookSearch Component
const useStyles = makeStyles({});

function BookSearch() {
  const classes = useStyles();
  //React hook is used to initialize current state and changed state value
  const [submit, setSubmit] = useState("");

  //function to submit searched text and fetch data based on search
  const submitHandler = (searchData) => {
    setSubmit(searchData);
  };

  return (
    <>
      <div>
        {/* Search Bar to search for books using Book Title */}
        <SearchBar searchKeyword={submitHandler} />
        <DisplayTable search={submit} />
      </div>
    </>
  );
}

export default BookSearch;
