import React from "react";
import BookSearch from "./Book Components/BookSearch";
//@mui/styles is used as a styling solution from Material-UI
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  header: {
    fontSize: "40px",
    color: "white",
    textAlign: "center",
    fontFamily: "Times New Roman, Times, serif",
    backgroundColor: "#008080",
    padding: "10px"
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
