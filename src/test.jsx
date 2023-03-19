import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const maxResults = 30;
  const [bookData, setBookData] = useState();
  const [searchedText, setSearchText] = useState("");
  // const [maxResults, setStartIndex] = useState();
  const [startIndex, setStartIndex] = useState();
  const Items = " Total Items";

  const key = "AIzaSyD2oiEDe09HbZfbNTJ6hSMt0yntfuUqe1k";
  const URL = `https://www.googleapis.com/books/v1/volumes?q=${searchedText}&startIndex=${startIndex}&maxResults=${maxResults}&key=`;

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleLoadMoreButtonClick = () => {
    setStartIndex((prevState) => {
      return prevState + maxResults;
    });
  };

  const handleLoadButtonClick = () => {
    if (startIndex !== 0) {
      setStartIndex(0); // сброс пагинации
    }
  };

  useEffect(() => {
    if (startIndex !== undefined) {
      axios.get(`${URL}+${key}`).then((response) => {
        setBookData((prevState) => setBookDataWithCheck(prevState, response)); //check
        // setBookData([...bookData.items, response.data.items]);
      });
    }
  }, [startIndex]);

  const setBookDataWithCheck = (prevState, response) => {
    //TODO добавить новые книги к старым, не выходя за пределы массива(!300\280)
  };

  function searchIsEmpty() {
    return searchedText === "";
  }

  // console.log(bookData);
  console.log(maxResults, "maxResults");

  return (
    <div>
      <div>
        <h1>
          {bookData && bookData.totalItems}
          {Items}
        </h1>
        <h1>
          {"startIndex = " + startIndex}
          <br />
          {"bookDataLength = " + bookData?.items?.length}
          <br />
        </h1>
        <label htmlFor="search">search</label>
        <input
          type="text"
          id="search"
          value={searchedText}
          onChange={handleChange}
        />
        <button onClick={handleLoadButtonClick} disabled={searchIsEmpty()}>
          тык
        </button>
        <button onClick={handleLoadMoreButtonClick} disabled={searchIsEmpty()}>
          Load more...
        </button>
      </div>
      {bookData?.items ? (
        <div>
          {bookData.items.map((book) => (
            <ul key={book.etag}>{book.volumeInfo.title}</ul>
          ))}
        </div>
      ) : (
        "Тут должны быть ваши книги..."
      )}
    </div>
  );
};
export default Test;
