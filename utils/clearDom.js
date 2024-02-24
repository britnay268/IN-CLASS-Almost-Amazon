const clearDom = () => {
  document.querySelector('#book-store').innerHTML = '';
  document.querySelector('#author-store').innerHTML = '';
  document.querySelector('#add-button').innerHTML = '';
  document.querySelector('#form-container').innerHTML = '';
  document.querySelector('#view').innerHTML = '';
};

export default clearDom;
