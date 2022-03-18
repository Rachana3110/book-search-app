import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";

// styles of AuthorTable Component
const useStyles = makeStyles({
  load: {
    padding: "10px",
    fontWeight: "bold"
  },
  root: {
    width: "250px"
  },
  main: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#008080",
    padding: "10px",
    color: "white",
    fontWeight: "bold"
  },
  container: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    paddingLeft: "10px"
  },
  itemLeft: {
    disply: "flex",
    fontSize: "15px",
    fontWeight: "bold",
    justifyContent: "left",
    paddingBottom: "10px"
  },
  itemRight: {
    disply: "flex",
    fontSize: "15px",
    justifyContent: "left",
    paddingBottom: "10px"
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
        //console.log(response.data);
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

  //returns null if fetched author data is empty
  if (!authorData.docs) {
    return null;
  }

  return (
    <>
      {/* Displayes author table only if author data is fetched */}
      {authorData !== "" ? (
        <div className={classes.root}>
          {/* Grid to display author details*/}
          <div className={classes.main}>Author Details</div>
          <div className={classes.container}>
            <div className={classes.itemLeft}>Author Name:</div>
            <div className={classes.itemRight}>{authorData.docs[0].name}</div>
            {authorData.docs[0].birth_date !== undefined && (
              <>
                <div className={classes.itemLeft}>Birth Date:</div>
                <div className={classes.itemRight}>
                  {authorData.docs[0].birth_date}
                </div>
              </>
            )}

            {authorData.docs[0].death_date !== undefined && (
              <>
                <div className={classes.itemLeft}>Death Date:</div>
                <div className={classes.itemRight}>
                  {authorData.docs[0].death_date}
                </div>
              </>
            )}

            {authorData.docs[0].top_work !== undefined && (
              <>
                <div className={classes.itemLeft}>Best Book:</div>
                <div className={classes.itemRight}>
                  {authorData.docs[0].top_work}
                </div>
              </>
            )}

            {authorData.docs[0].top_subjects !== undefined && (
              <>
                <div className={classes.itemLeft}>Subjects of Writing:</div>
                <div className={classes.itemRight}>
                  {authorData.docs[0].top_subjects.join(", ")}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div> No Author details found!</div>
      )}
    </>
  );
};

export default AuthorTable;
