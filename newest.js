const express = require("express");
const app = express();
app.use(express.json());
app.listen(3000);
const mysql = require("mysql2");
const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "kaka",
  })
  .promise();

// In-memory data store
let items = [];

// Create
function createItem(item) {
    items.push(item);
    console.log(`Item created: ${JSON.stringify(item)}`);
}

// Read
function readItems() {
    console.log('Items:', items);
    return items;
}

// Update
function updateItem(index, newItem) {
    if (index >= 0 && index < items.length) {
        items[index] = newItem;
        console.log(`Item updated at index ${index}: ${JSON.stringify(newItem)}`);
    } else {
        console.log('Item not found');
    }
}

// Delete
function deleteItem(index) {
    if (index >= 0 && index < items.length) {
        const deletedItem = items.splice(index, 1);
        console.log(`Item deleted at index ${index}: ${JSON.stringify(deletedItem)}`);
    } else {
        console.log('Item not found');
    }
}

// Example usage
createItem({ id: 1, name: 'Item 1' });
createItem({ id: 2, name: 'Item 2' });
readItems();
updateItem(0, { id: 1, name: 'Updated Item 1' });
deleteItem(1);
readItems();
// MySQL connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Create
function createItemInDB(item) {
    const query = 'INSERT INTO items SET ?';
    connection.query(query, item, (err, results) => {
        if (err) {
            console.error('Error creating item:', err);
            return;
        }
        console.log('Item created in DB:', results.insertId);
    });
}

// Read
function readItemsFromDB() {
    const query = 'SELECT * FROM items';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error reading items:', err);
            return;
        }
        console.log('Items from DB:', results);
    });
}

// Update
function updateItemInDB(id, newItem) {
    const query = 'UPDATE items SET ? WHERE id = ?';
    connection.query(query, [newItem, id], (err, results) => {
        if (err) {
            console.error('Error updating item:', err);
            return;
        }
        console.log('Item updated in DB:', results.message);
    });
}

// Delete
function deleteItemFromDB(id) {
    const query = 'DELETE FROM items WHERE id = ?';
    connection.query(query, id, (err, results) => {
        if (err) {
            console.error('Error deleting item:', err);
            return;
        }
        console.log('Item deleted from DB:', results.message);
    });
}

// Example usage with MySQL
createItemInDB({ id: 1, name: 'Item 1' });
createItemInDB({ id: 2, name: 'Item 2' });
readItemsFromDB();
updateItemInDB(1, { name: 'Updated Item 1' });
deleteItemFromDB(2);
readItemsFromDB();