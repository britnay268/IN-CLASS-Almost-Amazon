import { booksOnSale, getBooks } from '../api/bookData';
import { signOut } from '../utils/auth';
import { showBooks } from '../pages/books';
import { favoriteAuthor, getAuthors } from '../api/authorData';
import { showAuthors } from '../pages/authors';
import { searchStore } from '../api/mergedData';
import renderToDOM from '../utils/renderToDom';
import clearDom from '../utils/clearDom';
import getOrders from '../api/orderData';
import { showOrders } from '../pages/orders';

// navigation events
const navigationEvents = (uid) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // TODO: BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    // console.warn('CLICKED SALE BOOKS');
    booksOnSale(uid).then(showBooks);
    document.querySelector('.navbar-toggler').click();
  });

  // TODO: ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    // console.warn('CLICKED ALL BOOKS');
    getBooks(uid).then(showBooks);
    document.querySelector('.navbar-toggler').click();
  });

  document.querySelector('#logo').addEventListener('click', () => {
    // console.warn('CLICKED ALL BOOKS');
    getBooks(uid).then(showBooks);
  });

  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    // console.warn('CLICKED AUTHORS');
    getAuthors(uid).then(showAuthors);
    document.querySelector('.navbar-toggler').click();
  });

  document.querySelector('#fav-authors').addEventListener('click', () => {
    // console.warn('CLICKED AUTHORS');
    favoriteAuthor(uid).then(showAuthors);
    document.querySelector('.navbar-toggler').click();
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    // console.warn(searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE
      searchStore(searchValue, uid).then(({ books, authors }) => {
        if (books.length > 0 || authors.length > 0) {
          clearDom();
          // console.warn(books, authors);
          showBooks(books, false);
          showAuthors(authors, false);
        } else {
          clearDom();
          const domString = '<h1>No Results</h1>';
          renderToDOM('#author-store', domString);
        }
      });

      document.querySelector('#search').value = '';
    }
  });

  // ORDERS
  document.querySelector('#orders').addEventListener('click', () => {
    console.warn('CLICKED ORDERS');
    document.querySelector('.navbar-toggler').click();
    getOrders(uid).then(showOrders);
    // document.querySelector('.navbar-toggler').click();
  });
};

export default navigationEvents;
