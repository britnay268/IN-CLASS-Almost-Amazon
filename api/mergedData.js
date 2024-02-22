import { getAuthorBooks, getSingleAuthor } from './authorData';
import { getSingleBook } from './bookData';

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

export { getBookDetails, getAuthorDetails };
