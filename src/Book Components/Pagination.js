import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

// styles of Pagination component using MUI
const useStyles = makeStyles({
  button: {
    marginLeft: "5px",
    fontSize: "15px"
  },
  clickedButton: {
    fontSize: "20px",
    marginLeft: "5px",
    color: "black",
    backgroundColor: "paleturquoise"
  }
});

// Pagination component is created to accept parameter such as number of books per page,
// number of total books, function which returns data for each page, function to
//return current clicked button
const Pagination = ({ booksPerPage, totalBooks, paginate, currentPage }) => {
  const classes = useStyles();
  const [pageNumbers, setPageNumbers] = useState([]);

  // Itterates through the page numbers based on total book and
  // books data needed for each page and set the data to pageNumbers variable
  useEffect(() => {
    const arr = [];
    for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
      arr.push(i);
    }
    setPageNumbers(arr);
  }, [totalBooks]);

  return (
    <div className={classes.main}>
      {/* Buttons numbers are rendered and highlighting of current 
      page button is also handeled here*/}
      {pageNumbers &&
        pageNumbers.map((number) => {
          return (
            <button
              className={
                currentPage !== number ? classes.button : classes.clickedButton
              }
              onClick={totalBooks > 10 ? () => paginate(number) : paginate(1)}
            >
              {number}
            </button>
          );
        })}
    </div>
  );
};

export default Pagination;
