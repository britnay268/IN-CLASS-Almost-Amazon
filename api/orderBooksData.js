import client from '../utils/client';

const endpoint = client.databaseURL;

const getOrderBooks = (orderFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderBooks.json?orderBy="order_id"&equalTo="${orderFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => response.json())
    .then((data) => {
    // console.warn(Object.values(data));
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createOrderBooks = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderBooks.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrderBooks = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderBooks/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrderBooks = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderBooks/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getOrderBooks, createOrderBooks, updateOrderBooks, deleteOrderBooks
};
