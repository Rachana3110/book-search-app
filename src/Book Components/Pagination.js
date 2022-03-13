import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  button: {
    marginLeft: "5px",
    fontSize: "15px",
  },
  clickedButton: {
    fontSize: "20px",
    marginLeft: "5px",
    color: "black",
    backgroundColor: "paleturquoise",
  },
});

const Pagination = ({ booksPerPage, totalBooks, paginate, currentPage }) => {
  const classes = useStyles();
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
      arr.push(i);
    }
    setPageNumbers(arr);
  }, [totalBooks]);

  return (
    <div className={classes.main}>
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <button
                className={
                  currentPage !== number ? classes.button : classes.clickedButton
                }
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            );
          })}
    </div>
  );
};

export default Pagination;
