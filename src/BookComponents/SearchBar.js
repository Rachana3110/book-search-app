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
function Search({ searchKeyword }) {
  const classes = useStyles();

  //function to get text entered inside input bar after enter is pressed
  function handleSubmit(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchKeyword(e.target.value);
    }
  }

  return (
    <div className={classes.search}>
      <input
        className={classes.input}
        placeholder="Search books using book name and press enter..."
        onKeyPress={handleSubmit}
      ></input>
    </div>
  );
}

export default Search;
