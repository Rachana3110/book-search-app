import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import AuthorTable from "./AuthorTable";
import Drawer from "@mui/material/Drawer";

//Styles for BookTable Component
const useStyles = makeStyles({
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  table: {
    border: "1px solid black",
    borderCollapse: "collapse",
    backgroundColor: "#FFFFFF"
  },
  column: {
    border: "1px solid white",
    backgroundColor: "#008080",
    color: "white",
    textAlign: "center"
  },
  row: {
    textAlign: "left",
    border: "1px solid black"
  },
  button: {
    display: "flex",
    color: "blue",
    padding: "0",
    border: "none",
    background: "none",
    textAlign: "left",
    fontSize: "15px"
  },
  drawer: {
    backgroundColor: "transparent"
  }
});

const BookTable = ({ bookData }) => {
  const classes = useStyles();
  const [authorDetails, setAuthorDetails] = useState();
  const [display, setDisplay] = useState(false);

  const [state, setState] = useState({
    right: false
  });

  const toggleDrawer = (autherName, anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
    setDisplay(true);
    setAuthorDetails(autherName);
  };

  return (
    <div className={classes.root}>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className={classes.main}>
            {/* Table is created to display Book Details*/}
            <table className={classes.table}>
              <tr>
                {/* Column Names for Book Table*/}
                <th className={classes.column}> Book Name</th>
                <th className={classes.column}> Author Name</th>
                <th className={classes.column}> Year of Publish</th>
                <th className={classes.column}> Published Languages</th>
                <th className={classes.column}> Published Places</th>
              </tr>
              {bookData.map((book, key) => {
                return (
                  <>
                    <tr key={key}>
                      {/* Rows with Book Details for Book Table*/}
                      <td className={classes.row}>{book.title}</td>
                      <td className={classes.row}>
                        {/*Button is given for auther name and togglerDrawer is called 
                        so that if clicked on auther name side drawer should show up 
                        with author Details*/}
                        {book.author_name !== undefined &&
                          book.author_name !== null && (
                            <button
                              className={classes.button}
                              onClick={toggleDrawer(
                                book.author_name[0],
                                anchor,
                                true
                              )}
                            >
                              {book.author_name[0]}
                            </button>
                          )}
                      </td>
                      <td className={classes.row}>
                        {book.first_publish_year !== undefined &&
                          book.first_publish_year !== null &&
                          book.first_publish_year}
                      </td>
                      <td className={classes.row}>
                        {book.language !== null && book.language !== undefined
                          ? book.language.join(", ")
                          : book.language}
                      </td>
                      <td className={classes.row}>
                        {book.place != null
                          ? book.place.join(", ")
                          : book.place}
                      </td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
          {/* Temporary navigation drawers from Material-UI is used to toggle between open or close of sidebar*/}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(
              bookData.map(
                (book) => book.author_name !== undefined && book.author_name[0]
              ),
              anchor,
              false
            )}
            className={classes.drawer}
          >
            {/* Author Table is rendered in the side Drawer*/}
            <>{authorDetails && <AuthorTable value={authorDetails} />}</>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default BookTable;
