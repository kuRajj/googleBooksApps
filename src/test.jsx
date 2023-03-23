import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const maxResults = 3;
  const [bookData, setBookData] = useState();
  const [searchedText, setSearchText] = useState("");
  const [startIndex, setStartIndex] = useState();
  const [dataForPaginate, setDataForPaginate] = useState([]);
  const [filtration, setfiltration] = useState("");
  const [sorting, setSorting] = useState("Relevance");
  const key = "AIzaSyD2oiEDe09HbZfbNTJ6hSMt0yntfuUqe1k";
  const URL = `https://www.googleapis.com/books/v1/volumes?q=${searchedText}${filtration}&orderBy=${sorting}&startIndex=${startIndex}&maxResults=${maxResults}&key=`;

  console.log(dataForPaginate, "dataForPaginate");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleLoadMoreButtonClick = () => {
    setStartIndex((prevState) => {
      return prevState + maxResults;
    });
  };

  const handleLoadButtonClick = () => {
    //тык
    if (startIndex === 0) {
      setDataForPaginate([]);
      getBooks(true);

      return;
    }

    setStartIndex(0);
    setDataForPaginate([]);
  };

  function getBooks(isTyk = false) {
    if (startIndex === undefined) return;

    axios.get(`${URL}+${key}`).then((response) => {
      setBookData(response.data);
      isTyk === true
        ? setDataForPaginate([...response.data.items])
        : setDataForPaginate([...dataForPaginate, ...response.data.items]);
    });
  }

  useEffect(() => {
    getBooks();
  }, [startIndex]);

  function searchIsEmpty() {
    return searchedText === "";
  }

  const handleChangefiltration = (e) => {
    setfiltration(e.target.value);
  };
  const handleChangeSorting = (e) => {
    setSorting(e.target.value);
  };

  return (
    <div>
      <div>
        <h4 className="m-3">
          {bookData && bookData.totalItems + " Total items"}
        </h4>
        <div>
          <div className="input-group mb-3" style={{ width: "300px" }}>
            <input
              value={searchedText}
              onChange={handleChange}
              type="text"
              className="form-control mx-2"
              placeholder="Поиск"
              aria-label="Поиск"
              aria-describedby="basic-addon1"
              style={{ width: "50px" }}
            />
          </div>

          <div className="mb-3">
            <button
              onClick={handleLoadButtonClick}
              disabled={searchIsEmpty()}
              type="button"
              className="btn btn-primary mx-2"
            >
              Найти
            </button>
            <button
              onClick={handleLoadMoreButtonClick}
              disabled={searchIsEmpty()}
              type="button"
              className="btn btn-primary"
            >
              Загрузить еще...
            </button>
          </div>

          <div style={{ width: "250px" }} className="mx-2">
            <p className="mx-2">Категории</p>
            <select
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
              onChange={handleChangefiltration}
              value={filtration}
            >
              <option value="">Все</option>
              <option value="Art">Исcкуство</option>
              <option value="Biography">Биография</option>
              <option value="Computers">Компьютеры</option>
              <option value="History">История</option>
              <option value="Medical">Медицина</option>
              <option value="Poetry">Поэзия</option>
            </select>
          </div>

          <div style={{ width: "250px" }} className="mx-2">
            <p className="mx-2">Сортировка</p>
            <select
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
              onChange={handleChangeSorting}
              value={sorting}
            >
              <option value="Relevance">Релевантная</option>
              <option value="Newest">По дате</option>
            </select>
          </div>
        </div>
      </div>
      {bookData?.items ? (
        <div className="mt-3">
          {dataForPaginate.map((book) => (
            <div className="card" style={{ width: "300px" }}>
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                className="card-img-top"
                alt="oops"
              />
              <div className="card-body">
                <h5 className="card-title">{book.volumeInfo.title}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  {book.volumeInfo.categories
                    ? book.volumeInfo.categories[0]
                    : ""}
                </li>
                <li className="list-group-item">
                  {book.volumeInfo.authors
                    ? book.volumeInfo.authors.map((author) => <ul>{author}</ul>)
                    : ""}
                </li>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="m-2">Тут должны быть ваши книги...</p>
      )}
    </div>
  );
};
export default Test;

<div className="card" style={{ width: "400px" }}>
  <img src="..." className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Категория</li>
    <li className="list-group-item">Авторы</li>
  </ul>
</div>;
