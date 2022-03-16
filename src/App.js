import React from "react";
import BookSearch from "./Book Components/BookSearch";
//@mui/styles is used as a styling solution from Material-UI
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  header: {
    fontSize: "45px",
    color: "white",
    textAlign: "center",
    fontFamily: "Times New Roman",
    backgroundColor: "#2F4F4F",
    paddingTop: "10px"
  }
});

function App() {
  const classes = useStyles();

  return (
    <div>
      {/* Application  Header*/}
      <div className={classes.header}>Book Finder</div>
      {/* Rendering Book search component with Search Bar
       and List of books */}
      <BookSearch />
    </div>
  );
}

export default App;
