import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";
import Pagination from "./Pagination";
import { Box } from "@mui/material";
import axios from "axios";

//styles for BookSearch Component
const useStyles = makeStyles({
  load: {
    display: "flex",
    justifyContent: "center",
    color: "black",
    fontSize: "15px",
    fontWeight: "bold",
    backgroundColor: "white"
  },
  noResult: {
    display: "flex",
    justifyContent: "center",
    color: "#12ffe9",
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

function BookSearch() {
  const classes = useStyles();
  //React hook is used to initialize current state and changed state value
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetch = async () => {
    await axios("https://openlibrary.org/search.json?title=a")
      .then((response) => {
        console.log(response.data);
        const bookData = response.data;
        setData(bookData);
        setLoading(false);
      })
      .catch((error) => console.log("Error" + error));
  };

  useEffect(() => {
    setLoading(true);
    fetch();
  }, []);

  //loader screen is shown untill the data is fetched
  if (loading) {
    return <div className={classes.load}>Loading...Please wait!</div>;
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

  //Variable to store index of last and first book of a current book table
  // and filter searched data to display only 10 records per page
  const indexofLastBook = currentPage * booksPerPage;
  const indexofFirstBook = indexofLastBook - booksPerPage;
  const currentBooks = mainData.slice(indexofFirstBook, indexofLastBook);
  const SearchBooks = searchResults.slice(indexofFirstBook, indexofLastBook);

  return (
    <>
      <div>
        {/* Search Bar to search for books using Book Title */}
        <SearchBar term={search} searchKeyword={searchHandler} />
      </div>
      {search.length >= 1 && searchResults.length !== 0 && (
        <div className={classes.maintable}>
          {/* If search data has some value then filtered data is displayed according to 
          the searched word*/}
          <BookTable data={SearchBooks} />
          <div className={classes.pagination}>
            {/* rendering pagination for the table using Pagination Component */}
            <Pagination
              booksPerPage={booksPerPage}
              totalBooks={searchResults.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
      {search.length >= 1 && SearchBooks.length == 0 && (
        <h4 className={classes.noResult}>
          {/* If the searched data return no Book data then below message is displayed*/}
          No Book Details found for the Search!
        </h4>
      )}
    </>
  );
}

export default BookSearch;
