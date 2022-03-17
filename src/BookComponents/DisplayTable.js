import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import BookTable from "./BookTable";
import Pagination from "./Pagination";
import axios from "axios";

//styles for BookSearch Component
const useStyles = makeStyles({
  load: {
    display: "flex",
    justifyContent: "center",
    padding: "150px",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold"
  },
  noResult: {
    display: "flex",
    justifyContent: "center",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold"
  },
  maintable: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "50px"
  },
  pagination: {
    display: "flex",
    backgroundColor: "transparent",
    justifyContent: "center",
    padding: "10px"
  }
});

function DisplayTable({ search }) {
  const classes = useStyles();
  //React hook is used to initialize current state and changed state value
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);

  const fetch = async () => {
    await axios("https://openlibrary.org/search.json?title=" + search)
      .then((response) => {
        //console.log(response.data);
        const bookData = response.data;
        setData(bookData);
        setLoading(false);
      })
      .catch((error) => console.log("Error" + error));
  };

  //fetch function is called to retrieve data according to the search
  useEffect(() => {
    if (search !== "") {
      setLoading(true);
      fetch();
    }
  }, [search]);

  //loader screen is shown untill the data is fetched
  if (loading) {
    return (
      <div className={classes.load}>
        {search.length !== 0 && <>Loading...Please wait!</>}
      </div>
    );
  }

  //If Book data is empty then return null
  if (!data.docs) {
    return null;
  }

  //Function to  to set book data for each page
  const paginate = (number) => {
    return setCurrentPage(number);
  };

  let mainData = data.docs;
  //Variable to store index of last and first book of a current book table
  // and filter searched data to display only 10 records per page
  const indexofLastBook = currentPage * booksPerPage;
  const indexofFirstBook = indexofLastBook - booksPerPage;
  const currentBooks = mainData.slice(indexofFirstBook, indexofLastBook);

  return (
    <>
      {search.length >= 1 && mainData.length !== 0 && (
        <div className={classes.maintable}>
          {/* If search data has some value then filtered data is displayed according to 
          the searched word*/}
          <BookTable bookData={currentBooks} />
          <div className={classes.pagination}>
            {/* rendering pagination for the table using Pagination Component */}
            <Pagination
              booksPerPage={booksPerPage}
              totalBooks={mainData.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
      {mainData.length === 0 && (
        <h4 className={classes.noResult}>
          {/* If the searched data return no Book data then below message is displayed*/}
          No Book Details found for the Search!
        </h4>
      )}
    </>
  );
}

export default DisplayTable;
