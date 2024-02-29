import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyBooks = () => {
  const domString = '<h1>No Books Available</h1>';
  renderToDOM('#order-store', domString);
};

const showBooksNotInOrder = (array, orderFirebaseKey) => {
  clearDom();
  console.warn(orderFirebaseKey);

  if (array.length <= 0) {
    emptyBooks();
  } else {
    let domString = '';
    array.forEach((item) => {
      domString += `
        <div class="card">
          <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
          <div class="card-body" style="height: 180px;">
            <h5 class="card-title">${item.title}</h5>
              <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
              <hr>
              <i id="add-book-to-order-btn--${orderFirebaseKey}--${item.firebaseKey}" class="btn btn-success">Add Book To Order</i>
          </div>
        </div>`;
    });
    renderToDOM('#order-store', domString);
  }
};

export { showBooksNotInOrder, emptyBooks };
