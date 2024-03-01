import { deleteBook, getBooks, getSingleBook } from '../api/bookData';
import { showBooks } from '../pages/books';
import { getAuthors, getSingleAuthor } from '../api/authorData';
import { showAuthors } from '../pages/authors';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
import {
  deleteAuthorAndAuthorBooks, getASingleBookOrder, getAuthorDetails, getBookDetails, getBooksNotInOrder, getOrderAndBooks
} from '../api/mergedData';
import viewBook from '../pages/viewBook';
import viewAuthor from '../pages/viewAuthor';
import addOrderForm from '../components/forms/addOrderForm';
import { getOrders } from '../api/orderData';
import { showOrders } from '../pages/orders';
import viewOrder from '../pages/viewOrders';
import { showBooksNotInOrder } from '../pages/booksNotInOrder';
import { createOrderBooks, deleteOrderBooks, updateOrderBooks } from '../api/orderBooksData';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        // console.warn('CLICKED DELETE BOOK', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteBook(firebaseKey).then(() => {
          getBooks(uid).then(showBooks);
        });
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      // console.warn('ADD BOOK');
      addBookForm({ uid });
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      // console.warn('EDIT BOOK', e.target.id);
      const [, firebaseKey] = e.target.id.split('--');

      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      // console.warn('VIEW BOOK', e.target.id);
      // console.warn(e.target.id.split('--'));

      const [, firebaseKey] = e.target.id.split('--');

      getBookDetails(firebaseKey).then(viewBook);
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        // console.warn('DELETE AUTHOR', e.target.id);
        // console.warn(e.target.id.split('--'));
        const [, firebaseKey] = e.target.id.split('--');

        deleteAuthorAndAuthorBooks(firebaseKey).then(() => {
          getAuthors(uid).then(showAuthors);
        });
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      // console.warn('ADD AUTHOR');
      addAuthorForm();
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('edit-author')) {
      // console.warn('EDIT AUTHOR', e.target.id);
      const [, firebaseKey] = e.target.id.split('--');

      getSingleAuthor(firebaseKey).then(addAuthorForm);
    }

    if (e.target.id.includes('view-author-btn')) {
      // console.warn('VIEW BOOK', e.target.id);
      // console.warn(e.target.id.split('--'));

      const [, firebaseKey] = e.target.id.split('--');

      getAuthorDetails(firebaseKey).then(viewAuthor);
    }

    if (e.target.id.includes('author-backBtn')) {
      // console.warn('Back button clicked');
      getAuthors(uid).then(showAuthors);
    }

    if (e.target.id.includes('order-backBtn')) {
      // console.warn('Back button clicked');
      // getAuthors(uid).then(showAuthors);
      getOrders(uid).then(showOrders);
    }

    if (e.target.id.includes('add-order-btn')) {
      // console.warn('ADD AUTHOR');
      addOrderForm();
    }

    // This allows me to view the books for the order
    if (e.target.id.includes('view-order-btn')) {
      // console.warn('VIEW Order', e.target.id);

      const [, firebaseKey] = e.target.id.split('--');
      // This gets the order but has no books.
      // getSingleOrder(firebaseKey).then(viewOrder);

      getOrderAndBooks(firebaseKey).then(viewOrder);
      // console.warn(e.target.id.split('--'));
    }

    if (e.target.id.includes('show-books-not-in-order-btn')) {
      console.warn('Show Books', e.target.id);
      // console.warn(e.target.id.split('--'));
      const [, orderFirebaseKey] = e.target.id.split('--');
      // This show undefined because we need to do a merged Promise to get the books related to the order_id and book_id (getOrderBooks(firebaseKey).then(showBooksNotInOrder);)
      getBooksNotInOrder(uid, orderFirebaseKey).then((array) => showBooksNotInOrder(array, orderFirebaseKey));
    }

    if (e.target.id.includes('add-book-to-order-btn')) {
      console.warn('Add To Order', e.target.id);

      // SPLIT OFF THE BOTH KEYS FROM BUTTON
      const [, orderFirebaseKey, bookFirebaseKey] = e.target.id.split('--');
      // CREATE A PAYLOAD TO REPRESENT THE ORDERBOOK MANY-TO-MANY RELATIONSHIP
      console.warn(orderFirebaseKey);
      const payload = {
        order_id: orderFirebaseKey,
        book_id: bookFirebaseKey,
        uid
      };
      // CREATE ORDERBOOK
      createOrderBooks(payload).then(({ name }) => {
        // PATCH FIREBASEKEY
        const patchPayload = { firebaseKey: name };
        // UPDATE ORDER BOOK
        updateOrderBooks(patchPayload).then(() => {
          // CALL GET ALL BOOKS NOT IN THE ORDER SO THE BOOK JUST ADDED WILL NOT SHOW IN VIEW
          // YOU CAN ONLY ADD BOOKS TO ORDER FROM THE showBooksNotInOrder VIEW
          getBooksNotInOrder(uid, orderFirebaseKey).then((array) => showBooksNotInOrder(array, orderFirebaseKey));
        });
      });
    }

    if (e.target.id.includes('delete-book-from-order-btn')) {
      console.warn('Delete Book from Order', e.target.id);
      // SPLIT OFF THE BOTH KEYS FROM BUTTON
      const [, orderFirebaseKey, bookFirebaseKey] = e.target.id.split('--');
      // GET THE SINGLE BOOK ORDER SO YOU HAVE THE FIREBASEKEY
      getASingleBookOrder(orderFirebaseKey, bookFirebaseKey)
        // DELETE SINGLE ORDERBOOK BY FIREBASEKEY
        .then((orderBook) => deleteOrderBooks(orderBook.firebaseKey))
        .then(() => {
          // GET ORDER DETAILS AND VIEW ORDER
          getOrderAndBooks(orderFirebaseKey).then(viewOrder);
        });
    }

    if (e.target.id.includes('edit-order-btn')) {
      console.warn('Edit Order', e.target.id);
      // console.warn(e.target.id.split('--'));
    }

    if (e.target.id.includes('delete-order-btn')) {
      console.warn('Delete Order', e.target.id);
      // console.warn(e.target.id.split('--'));
    }
  });
};

export default domEvents;
