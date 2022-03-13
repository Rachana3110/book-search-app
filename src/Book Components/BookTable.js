import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import AuthorTable from "./AuthorTable";
import Drawer from "@mui/material/Drawer";

const useStyles = makeStyles({
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  table: {
    border: "1px solid black",
    borderCollapse: "collapse",
    backgroundColor: "#FFFFFF",
  },
  column: {
    border: "1px solid white",
    backgroundColor: "#2F4F4F",
    color: "white",
    textAlign: "center",
  },
  row: {
    textAlign: "left",
    border: "1px solid black",
  },
  SideBar: {
    display: "flex",
  },
  button: {
    display: "flex",
    color: "blue",
    padding: "0",
    border: "none",
    background: "none",
    textAlign: "left",
    fontSize: "15px",
  },
});

const BookTable = ({ data }) => {
  const classes = useStyles();
  const [authorDetails, setAuthorDetails] = useState();
  const [display, setDisplay] = useState(false);

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (autherName, anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    setDisplay(true);
    setAuthorDetails(autherName);
  };

  return (
    <div className={classes.root}>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className={classes.main}>
            <table className={classes.table}>
              <tr>
                <th className={classes.column}> Book Name</th>
                <th className={classes.column}> Author Name</th>
                <th className={classes.column}> Year of Publish</th>
                <th className={classes.column}> Published Languages</th>
                <th className={classes.column}> Published Places</th>
              </tr>
              {data.map((val, key) => {
                return (
                  <>
                    <tr key={key}>
                      <td className={classes.row}>{val.title}</td>
                      <td className={classes.row}>
                        <button
                          className={classes.button}
                          onClick={toggleDrawer(
                            val.author_name[0],
                            anchor,
                            true
                          )}
                        >
                          {val.author_name[0]}
                        </button>
                      </td>
                      <td className={classes.row}>{val.first_publish_year}</td>
                      <td className={classes.row}>
                        {val.language != null
                          ? val.language.join(", ")
                          : val.language}
                      </td>
                      <td className={classes.row}>
                        {val.place != null ? val.place.join(", ") : val.place}
                      </td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(
              data.map((book) => book.author_name[0]),
              anchor,
              false
            )}
          >
            <>{authorDetails && <AuthorTable value={authorDetails} />}</>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default BookTable;
