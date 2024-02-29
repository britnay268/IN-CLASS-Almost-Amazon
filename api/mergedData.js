import {
  deleteSingleAuthor, getAuthorBooks, getAuthors, getSingleAuthor
} from './authorData';
import { deleteBook, getBooks, getSingleBook } from './bookData';
import { getOrderBooks } from './orderBooksData';
import { getSingleOrder } from './orderData';

// for merged promises
const getBookDetails = async (firebaseKey) => { // the async keyword let's JS know this is asynchronous function (promise)
  const bookObject = await getSingleBook(firebaseKey); // await stops the code in this function and waits for the response. This is like using .then
  const authorObject = await getSingleAuthor(bookObject.author_id); // this function uses the data response from the bookObject

  return { ...bookObject, authorObject };
};

const getAuthorDetails = async (authorFirebaseKey) => {
  const authorObject = await getSingleAuthor(authorFirebaseKey);
  const authorBooks = await getAuthorBooks(authorFirebaseKey);
  // console.warn(authorObject);
  // console.warn(authorFirebaseKey);

  return { ...authorObject, books: authorBooks };
};

const deleteAuthorAndAuthorBooks = async (authorFirebaseKey) => {
  // Gets all Authorbooks and result should be an array of books
  const authorBooks = await getAuthorBooks(authorFirebaseKey);
  // This maps or loops through author books and delete the book based on the firebasekey in the specific object in the authorBooks array
  const deleteBookPromises = await authorBooks.map((authbookObj) => deleteBook(authbookObj.firebaseKey));

  // Passes an array of promises and then delete the single author
  await Promise.all(deleteBookPromises).then(() => deleteSingleAuthor(authorFirebaseKey));
};

const searchStore = async (searchValue, uid) => {
  const allBooks = await getBooks(uid);
  const allAuthors = await getAuthors(uid);

  const filteredBooks = await allBooks.filter((book) => (
    book.title.toLowerCase().includes(searchValue)
    || book.description.toLowerCase().includes(searchValue)
    || book.price.includes(parseInt(searchValue, 10))
  ));

  const filteredAuthors = await allAuthors.filter((author) => (
    author.first_name.toLowerCase().includes(searchValue)
    || author.last_name.toLowerCase().includes(searchValue)
    || author.email.toLowerCase().includes(searchValue)
  ));

  return { books: filteredBooks, authors: filteredAuthors };
};

const getBooksNotInOrder = async (uid, orderFirebaseKey) => {
  // GET ALL THE BOOKS
  const allBooks = await getBooks(uid);
  // GET ALL THE ORDERBOOKS RELATES TO THE ORDER
  const allOrderBooks = await getOrderBooks(orderFirebaseKey);
  // GET THE BOOKS FOUND IN THE ORDERBOOKS, RETURNS AN ARRAY OF PROMISES
  const booksInOrderBooksPromise = await allOrderBooks.map((oB) => getSingleBook(oB.book_id));
  // USE PROMISE.ALL() TO RETURN EACH BOOK OBJECT
  const booksInOrder = await Promise.all(booksInOrderBooksPromise);
  // FILTER AND COMPARE USING .SOME() THE TWO ARRAYS OF ALL BOOKS AND ALL ORDERBOOKS
  // IF A BOOK IS FOUND IN ORDERBOOKS THEN IT WILL NOT BE RETURN IN THIS ARRAY
  const filteredBooks = await allBooks.filter((book) => !booksInOrder.some((otherBooks) => book.firebaseKey === otherBooks.firebaseKey));
  // ONLY RETURN THE BOOKS NOT RELATED TO ORDER
  return filteredBooks;
};

const getOrderAndBooks = async (orderFirebaseKey) => {
  //  GET THE SINGLE ORDER
  const order = await getSingleOrder(orderFirebaseKey);

  // GET THE ORDERBOOKS RELATED TO THE ORDER
  const orderBooks = await getOrderBooks(orderFirebaseKey);
  // GET THE SINGLE BOOKS IN ORDER RETURNS AN ARRAY OF PROMISES
  const books = await orderBooks.map((ob) => getSingleBook(ob.book_id));
  // PROMISE.ALL TO GET ALL BOOK OBJECTS
  const booksInOrder = await Promise.all(books);
  // RETURN THE ORDER OBJECT AND THE ARRAY OF BOOKS FOUND IN ORDERBOOKS
  return { ...order, books: booksInOrder };
};

// // THIS IS USED TO REMOVE A BOOK FROM AN ORDER
// const getASingleBookOrder = async (bookFirebaseKey, orderFirebaseKey) => {
//   // GET ALL THE ORDERBOOKS RELATED TO THE ORDER

//   // FIND THE SINGLE BOOK WHERE ORDERBOOK.BOOK_ID IS EQUAL TO THE BOOKFIREBASEKEY

//   // RETURN THE SINGLE ORDERBOOK SO YOU CAN HAVE THE FIREBASEKEY TO DELETE
// };

export {
  getBookDetails, getAuthorDetails, deleteAuthorAndAuthorBooks, searchStore, getBooksNotInOrder, getOrderAndBooks
};
