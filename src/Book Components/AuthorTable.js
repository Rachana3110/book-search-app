import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  table: {
    border: "1px solid black",
    borderCollapse: "collapse",
    height: "130px",
    width: "100px",
  },
  column: {
    border: "1px solid black",
    backgroundColor: "#2F4F4F",
    color: "white",
    textAlign: "center",
  },
  row: {
    textAlign: "left",
    border: "1px solid black",
  },
});

const AuthorTable = (name) => {
  const classes = useStyles();
  const [authorData, setAuthorData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const author = Object.values(name)[0];

  const displayData = (authName) => {
    setLoading(true);
    fetch("https://openlibrary.org/search/authors.json?q=" + authName)
      .then((response) => response.json())
      .then((authorData) => setAuthorData(authorData))
      .then(() => setLoading(false))
      .catch(setError);
  };

  useEffect(() => {
    displayData(author);
  }, [author]);

  if (loading) {
    return <></>;
  }

  if (error) {
    return <h3>{JSON.stringify(error, null, 2)}</h3>;
  }

  if (!authorData.docs) {
    return null;
  }

  return (
    <>
      {authorData !== "" && (
        <div className={classes.main}>
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
      )}
    </>
  );
};

export default AuthorTable;
