import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";
import Pagination from "./Pagination";
import { Box, CircularProgress } from "@mui/material";

const useStyles = makeStyles({
  load: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "150px",
    alignItems: "center",
  },
  noResult: {
    textAlign: "center",
    padding: "50px",
    color: "black",
    fontSize: "20px",
  },
  maintable: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "50px",
  },
  pagination: {
    display: "flex",
    backgroundColor: "#2F4F4F",
    justifyContent: "center",
    padding: "10px",
  },
});

function BookSearch() {
  const classes = useStyles();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://openlibrary.org/search.json?title=a")
      .then((response) => response.json())
      .then((data) => setData(data))
      .then(() => setLoading(false))
      .catch(setError);
  }, []);
  console.log(data);

  if (loading) {
    return (
      <Box className={classes.load}>
        <CircularProgress size={"100px"} color="inherit" />
        <h4>Loading...Please wait!</h4>
      </Box>
    );
  }

  if (error) {
    return <h3>{JSON.stringify(error, null, 2)}</h3>;
  }

  if (!data.docs) {
    return null;
  }
  let mainData = data.docs;
  let filterdata = data.docs;

  const searchHandler = (searchData) => {
    setSearch(searchData);
    if (searchData !== "") {
      const filteredBookList = filterdata.filter((books) => {
        return books?.title.toLowerCase().includes(searchData.toLowerCase());
      });

      setSearchResults(filteredBookList);
    } else {
      setSearchResults(filterdata);
    }
  };

  const paginate = (number) => {
    return setCurrentPage(number);
  };

  const indexofLastBook = currentPage * booksPerPage;
  const indexofFirstBook = indexofLastBook - booksPerPage;
  const currentBooks = mainData.slice(indexofFirstBook, indexofLastBook);

  return (
    <>
      <div>
        <SearchBar term={search} searchKeyword={searchHandler} />
      </div>
      {search.length < 1 ? (
        <div className={classes.maintable}>
          <div>
            <BookTable data={currentBooks} />
          </div>
          <div className={classes.pagination}>
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
          <BookTable data={searchResults} />
        </div>
      ) : (
        <div className={classes.noResult}>
          No Book Details found for the Search!
        </div>
      )}
    </>
  );
}

export default BookSearch;
