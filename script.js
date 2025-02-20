"use strict";

const newBtn = document.querySelector(".new");
const dialog = document.querySelector(".dialog");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("#submit-book");
const container = document.querySelector("#container");

const myLibrary = [];

function init() {
  class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read === "true" ? true : false;
    }
    switchRead() {
      this.read ? (this.read = false) : (this.read = true);
    }
  }

  // function Book(title, author, pages, read) {
  //   this.title = title;
  //   this.author = author;
  //   this.pages = pages;
  //   this.read = read === "true" ? true : false;
  //   this.switchRead = function () {
  //     this.read ? (this.read = false) : (this.read = true);
  //   };
  // }

  function addBooktoLibrary(title, author, pages, read = false) {
    myLibrary.push(new Book(title, author, pages, read));
  }
  addBooktoLibrary("The Hobbit", "Tolkien", 432, "true");
  addBooktoLibrary("Bob Bobbington", "Tolkien", 432, false);
  addBooktoLibrary("Bob", "Tolkien", 432, false);

  function clearDisplay() {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function displayAllBooks() {
    clearDisplay();
    myLibrary.forEach((book) => {
      displayBook(Object.values(book), myLibrary.indexOf(book));
    });
  }
  displayAllBooks();

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
    } else if (info === true) {
      para.textContent = "Read";
    } else if (Number.isInteger(info)) {
      para.textContent = `${info} Pages`;
    } else {
      para.textContent = `${info}`;
    }
  }
  function addBtn(input, index) {
    const lastCard = document.querySelector(".card:last-child");
    const makeBtn = document.createElement("button");
    lastCard.appendChild(makeBtn);
    makeBtn.textContent = `${input.slice(0, 1).toUpperCase()}${input.slice(1)}`;
    makeBtn.classList.add(input);
    makeBtn.setAttribute("index", index);
  }

  function displayBook(book, index) {
    addDiv();
    for (let info of book) {
      if (!(info instanceof Function)) {
        addPara(info);
      }
    }
    addBtn("remove", index);
    addBtn("read", index);
  }

  function getNewBook() {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const bookData = new FormData(form);
      const bookInput = [...bookData].map(([, val]) => val);
      addBooktoLibrary(...bookInput);
      clearDisplay();
      displayAllBooks(myLibrary);
      dialog.close();
      form.reset();
      listenBtns();
    });
  }

  function toggleDialog() {
    newBtn.addEventListener("click", function () {
      dialog.showModal();
    });
    closeBtn.addEventListener("click", function () {
      dialog.close();
      form.reset();
    });
  }

  function listenBtns() {
    const removeBtns = document.querySelectorAll(".remove");
    const readBtns = document.querySelectorAll(".read");
    removeBtns.forEach((btn) =>
      btn.addEventListener("click", function (e) {
        removeBook(e.target.getAttribute("index"));
      })
    );
    readBtns.forEach((btn) =>
      btn.addEventListener("click", function (e) {
        toggleRead(e.target.getAttribute("index"));
      })
    );
  }

  function removeBook(index) {
    myLibrary.splice(index, 1);
    displayAllBooks();
    listenBtns();
  }
  function toggleRead(index) {
    myLibrary[index].switchRead();
    displayAllBooks();
    listenBtns();
  }
  toggleDialog();
  getNewBook();
  listenBtns();
}
init();
