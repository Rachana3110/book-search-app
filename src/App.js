import React from "react";
import BookSearch from "./Book Components/BookSearch";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  header: {
    fontSize: "40px",
    color: "white",
    textAlign: "center",
    fontFamily: "Times New Roman, Times, serif",
    backgroundColor: "#008080",
    padding: "10px",
  },
});

function App() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.header}>Book Finder</div>
      <BookSearch />
    </div>
  );
}

export default App;
