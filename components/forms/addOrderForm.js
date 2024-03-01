import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';

const addOrderForm = (obj = {}) => {
  clearDom();
  const domString = `
    <form id="${obj.firebaseKey ? `update-order--${obj.firebaseKey}` : 'submit-order'}" class="mb-4">
      <div class="form-group">
        <label for="image">First Name</label>
        <input type="text" class="form-control" id="customer_firstName" placeholder="First Name" value="${obj.customer_firstName || ''}" required>
      </div>
      <div class="form-group">
        <label for="image">Last Name</label>
        <input type="text" class="form-control" id="customer_lastName" placeholder="Last Name"  value="${obj.customer_lastName || ''}" required>
      </div>
      <div class="form-group">
        <label for="title">Notes</label>
        <input type="text" class="form-control" id="notes" aria-describedby="Notes" placeholder="Enter Notes"  value="${obj.notes || ''}" >
      </div>
      <button type="submit" class="btn btn-primary mt-3">${obj.firebaseKey ? 'Update Order' : 'Submit Form'}</button>
      </div>
      <button type="submit" id="order-backBtn" class="btn btn-primary mt-3">Back</button>
    </form>`;

  renderToDOM('#form-container', domString);
};

export default addOrderForm;
