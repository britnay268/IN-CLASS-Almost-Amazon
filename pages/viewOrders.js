import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewOrder = (obj) => {
  clearDom();
  console.warn(obj);
  const btnString = `<button class="btn btn-success btn-lg mb-4" id="show-books-not-in-order-btn--${obj.firebaseKey}">Add A Book To Order</button>`;
  renderToDOM('#add-button', btnString);

  let domString = `
  <div class="mt-5 d-flex flex-wrap">
    <div class="text-white ms-5 details">
      <h5>${obj.customer_firstName} ${obj.customer_lastName}</h5>
      <p>${obj.notes || ''}</p>
      <div style="margin-bottom: 15px";>
        <i class="btn btn-info" id="edit-order--${obj.firebaseKey}"><span class="fas fa-edit" id="edit-order-btn--${obj.firebaseKey}"></span></i>
        <i class="btn btn-danger" id="delete-order-btn--${obj.firebaseKey}"><span class="fas fa-trash-alt" id="delete-order-btn--${obj.firebaseKey}"></span></i>
      </div>
      <h5>Orders</h5>
    </div>
  </div>`;

  if (obj.books.length) {
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
                <i id="delete-book-from-order-btn--${obj.firebaseKey}--${book.firebaseKey}" class="btn btn-danger"><span class="fas fa-trash-alt"></span></i>
              </div>
          </div>
        </div>
      </div>`;
    });
  } else {
    domString += '<p>There are No Books in Order</p>';
  }

  renderToDOM('#view', domString);
};

export default viewOrder;
