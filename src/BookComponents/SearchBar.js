import React from "react";
import { makeStyles } from "@mui/styles";

// Styles of SearchBar component
const useStyles = makeStyles({
  search: {
    display: "flex",
    justifyContent: "center",
    height: "30px",
    paddingTop: "20px"
  },
  input: {
    padding: "20px",
    borderBottom: "3px solid #333",
    fontSize: "15px",
    width: "400px"
  }
});

// functional component which takes initial text
// and text entered on search bar
function Search({ term, searchKeyword }) {
  const classes = useStyles();
  //function to get text entered inside input bar
  function handleSearch(e) {
    searchKeyword(e.target.value);
  }

  return (
    <div className={classes.search}>
      <input
        className={classes.input}
        type="text"
        value={term}
        placeholder="Search Books Using Book Name..."
        onChange={handleSearch}
      ></input>
    </div>
  );
}

export default Search;
