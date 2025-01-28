"use strict";

const newBtn = document.querySelector(".new");
const dialog = document.querySelector(".dialog");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("#submit-book");
const container = document.querySelector("#container");

const myLibrary = [];

function init() {
  function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  function addBooktoLibrary(title, author, pages, read = false) {
    myLibrary.push(new Book(title, author, pages, read));
  }
  addBooktoLibrary("hobbit", "tolkien", 432, true);
  addBooktoLibrary("bob bobbington", "tolkien", 432, false);
  addBooktoLibrary("bob bobbington", "tolkien", 432, false);

  function clearDisplay() {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function displayAllBooks(myLibrary) {
    myLibrary.forEach((book) => {
      displayBook(Object.values(book));
    });
  }
  displayAllBooks(myLibrary);

  function addDiv() {
    const div = document.createElement("div");
    container.appendChild(div);
    div.classList.add("card");
  }

  function addPara(info) {
    const lastCard = document.querySelector(".card:last-child");
    const para = document.createElement("p");
    lastCard.appendChild(para);
    if (info === false) {
      para.textContent = "Un-Read";
    } else if (info === "true") {
      para.textContent = "Read";
    } else if (Number.isInteger(info)) {
      para.textContent = `${info} pages`;
    } else {
      para.textContent = `${info}`;
    }
  }

  function displayBook(book) {
    addDiv();
    for (let info of book) {
      addPara(info);
    }
  }

  function getNewBook() {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const bookData = new FormData(form);
      const bookInput = [...bookData].map(([, val]) => val);
      console.log(bookInput);
      addBooktoLibrary(...bookInput);
      clearDisplay();
      displayAllBooks(myLibrary);
      dialog.close();
      form.reset();
    });
  }

  function toggleDialog() {
    newBtn.addEventListener("click", function () {
      dialog.showModal();
    });
    closeBtn.addEventListener("click", function () {
      dialog.close();
    });
  }
  toggleDialog();
  getNewBook();
}
init();
