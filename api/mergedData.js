import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';

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

export { getBookDetails, getAuthorDetails, deleteAuthorAndAuthorBooks };
