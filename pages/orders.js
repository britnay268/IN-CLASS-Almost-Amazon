import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyOrders = () => {
  const domString = '<h1>No Authors</h1>';
  renderToDOM('#order-store', domString);
};

const showOrders = (array) => {
  clearDom();

  const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-order-btn">Add An Order</button>';

  renderToDOM('#add-button', btnString);

  if (array.length <= 0) {
    emptyOrders();
  } else {
    let domString = '';
    array.forEach((item) => {
      domString += `
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${item.customer_firstName} ${item.customer_lastName}</h5>
          <p class="card-text">${item.notes}</p>
          <i class="btn btn-success" id="view-order-btn--${item.firebaseKey}"><span class="fas fa-eye" id="view-order-btn--${item.firebaseKey}"></span></i>
          <i class="btn btn-info" id="edit-order--${item.firebaseKey}"><span class="fas fa-edit" id="edit-order--${item.firebaseKey}"></span></i>
          <i class="btn btn-danger" id="delete-order-btn--${item.firebaseKey}"><span class="fas fa-trash-alt" id="delete-order-btn--${item.firebaseKey}"></span></i>
        </div>
      </div>
      `;
    });
    renderToDOM('#order-store', domString);
  }
};

export { showOrders, emptyOrders };
