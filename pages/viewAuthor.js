import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthor = (obj) => {
  clearDom();

  let domString = `
  <div class="mt-5 d-flex flex-wrap">
    <div class="text-white ms-5 details">
      <h5>${obj.first_name} ${obj.last_name} ${obj.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
      Author Email: <a href="mailto:${obj.email}">${obj.email}</a>
      <p>${obj.books.description || ''}</p>
      <div style="margin-bottom: 15px";>
        <i class="btn btn-info" id="edit-author--${obj.firebaseKey}"><span class="fas fa-edit" id="edit-author--${obj.firebaseKey}"></span></i>
        <i class="btn btn-danger" id="delete-author-btn--${obj.firebaseKey}"><span class="fas fa-trash-alt" id="delete-author-btn--${obj.firebaseKey}"></span></i>
      </div>
      <h5>Books</h5>
    </div>
  </div>`;

  obj.books.forEach((book) => {
    domString += `
    <div class="mt-5 d-flex flex-wrap">
      <div class="d-flex flex-row">
        <div class="card" style="width: 300px; margin-left: 40px;">
            <img class="card-img-top" src=${book.image} alt=${book.title} style="height: 400px;">
            <div class="card-body" style="height: 180px;">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text bold">${book.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${book.price}` : `$${book.price}`}</p>
              <hr>
              <i class="btn btn-success" id="view-book-btn--${book.firebaseKey}"><span class="fas fa-eye"></span></i>
              <i id="edit-book-btn--${book.firebaseKey}" class="btn btn-info"><span class="fas fa-edit"></span></i>
              <i id="delete-book-btn--${book.firebaseKey}" class="btn btn-danger"><span class="fas fa-trash-alt"></span></i>
            </div>
        </div>
      </div>
    </div>`;
  });

  renderToDOM('#view', domString);
};

export default viewAuthor;
