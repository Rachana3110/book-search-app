import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";
import Pagination from "./Pagination";
import { Box, CircularProgress } from "@mui/material";

//styles for BookSearch Component
const useStyles = makeStyles({
  load: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "150px",
    alignItems: "center"
  },
  noResult: {
    textAlign: "center",
    padding: "50px",
    color: "black",
    fontSize: "20px"
  },
  maintable: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "50px"
  },
  pagination: {
    display: "flex",
    backgroundColor: "#2F4F4F",
    justifyContent: "center",
    padding: "10px"
  }
});

function BookSearch() {
  const classes = useStyles();
  //React hook is used to initialize current state and changed state value
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    //fetching Books data from public API
    fetch("https://openlibrary.org/search.json?title=a")
      .then((response) => response.json())
      .then((data) => setData(data))
      .then(() => setLoading(false))
      .catch(setError);
  }, []);

  //loader screen is shown untill the data is fetched
  if (loading) {
    return (
      <Box className={classes.load}>
        <CircularProgress size={"100px"} color="inherit" />
        <h4>Loading...Please wait!</h4>
      </Box>
    );
  }

  //Error is being handled incase any error occurs while fetching data
  if (error) {
    return <h3>{JSON.stringify(error, null, 2)}</h3>;
  }

  //If Book data is empty then return null
  if (!data.docs) {
    return null;
  }
  //Variable to store original fetched data
  let mainData = data.docs;
  //Variable to store fetched data and used for filtering data after search
  let filterData = data.docs;

  //function to handle filtering of searched Book title in search bar
  const searchHandler = (searchData) => {
    setSearch(searchData);
    //Checking if seach data is not empty
    if (searchData !== "") {
      //filter Books using Searched data
      const filteredBookList = filterData.filter((books) => {
        return books?.title.toLowerCase().includes(searchData.toLowerCase());
      });
      //setting filtered data to searchResults
      setSearchResults(filteredBookList);
    } else {
      setSearchResults(filterData);
    }
  };
  //Function to  to set book data for each page
  const paginate = (number) => {
    return setCurrentPage(number);
  };

  //Variable to store index of last book for a current book table
  const indexofLastBook = currentPage * booksPerPage;
  //Variable to store index of first book for a current book table
  const indexofFirstBook = indexofLastBook - booksPerPage;
  //Filter Book data to display 10 records per page
  const currentBooks = mainData.slice(indexofFirstBook, indexofLastBook);

  return (
    <>
      <div>
        {/* Search Bar to search for books using Book Title */}
        <SearchBar term={search} searchKeyword={searchHandler} />
      </div>
      {search.length < 1 ? (
        <div className={classes.maintable}>
          <div>
            {/* If searched data is empty then all the Books are displayed in a table with book Details*/}
            <BookTable data={currentBooks} />
          </div>
          <div className={classes.pagination}>
            {/* rendering pagination for the table using Pagination Component*/}
            <Pagination
              booksPerPage={booksPerPage}
              totalBooks={mainData.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      ) : searchResults.length !== 0 ? (
        <div className={classes.maintable}>
          {/* If search data has some value then filtered data is displayed according to 
          the searched word*/}
          <BookTable data={searchResults} />
        </div>
      ) : (
        <div className={classes.noResult}>
          {/* If the searched data return no Book data then below message is displayed*/}
          No Book Details found for the Search!
        </div>
      )}
    </>
  );
}

export default BookSearch;
