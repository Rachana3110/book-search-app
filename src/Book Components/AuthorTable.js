import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";

// styles of AuthorTable Component
const useStyles = makeStyles({
  load: {
    padding: "40px"
  },
  table: {
    border: "1px solid black",
    borderCollapse: "collapse",
    height: "130px",
    width: "100px"
  },
  column: {
    border: "1px solid black",
    backgroundColor: "#2F4F4F",
    color: "white",
    textAlign: "center"
  },
  row: {
    textAlign: "left",
    border: "1px solid black"
  }
});

const AuthorTable = (name) => {
  const classes = useStyles();
  const [authorData, setAuthorData] = useState("");
  const [loading, setLoading] = useState(false);
  const author = Object.values(name)[0];

  // Initialised to fetch data of author by passing author name
  // to the public url
  const displayData = async (authName) => {
    await axios("https://openlibrary.org/search/authors.json?q=" + authName)
      .then((response) => {
        console.log(response.data);
        const authorDetails = response.data;
        setAuthorData(authorDetails);
        setLoading(false);
      })
      .catch((error) => console.log("Error" + error));
  };

  useEffect(() => {
    setLoading(true);
    //displayData is called to get author details
    displayData(author);
  }, [author]);

  //Loading untill author detials is fetched
  if (loading) {
    return (
      <div className={classes.load}>Loading Author Details! Plase wait..</div>
    );
  }

  //returns null if fetched data is empty
  if (!authorData.docs) {
    return null;
  }

  return (
    <>
      {/* Displayes author table only if author data is fetched */}
      {authorData !== "" ? (
        <div className={classes.main}>
          {/* Table to display author details*/}
          <table className={classes.table}>
            <tr>
              <th className={classes.column}> Author Name</th>
              <th className={classes.column}> Birth Date</th>
              <th className={classes.column}> Death Date</th>
              <th className={classes.column}> Best Book</th>
              <th className={classes.column}> Subject of Writing</th>
            </tr>
            <tr>
              <td className={classes.row}>{authorData.docs[0].name}</td>
              <td className={classes.row}>{authorData.docs[0].birth_date}</td>
              <td className={classes.row}>{authorData.docs[0].death_date}</td>
              <td className={classes.row}>{authorData.docs[0].top_work}</td>
              <td className={classes.row}>
                {authorData.docs[0].top_subjects.join(", ")}
              </td>
            </tr>
          </table>
        </div>
      ) : (
        <div> No Author details found!</div>
      )}
    </>
  );
};

export default AuthorTable;
