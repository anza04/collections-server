const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const { 
     getAllUsers, createUser, getUser, updateUser, deleteUser,
    sendFriendRequest, updateFriendRequestStatus, removeFriend,
    createCollection, getCollectionsByUser, updateCollection, deleteCollection,
    addItem, getItemsByCollection, updateItem, deleteItem,
    createListing, getActiveListings, updateListingStatus, deleteListing,
    blockUser, unblockUser
} = require('./crud.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/test', async (req, res) => {
    res.json({ message: 'Test' });
});

/** USERS ROUTES **/
app.post('/users', async (req, res) => {
    const { username, email, passwordHash } = req.body;
    const userId = await createUser(username, email, passwordHash);
    res.json({ userId });
});

app.get('/users', async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
});

app.get('/users/:id', async (req, res) => {
    const user = await getUser(req.params.id);
    res.json(user);
});

app.put('/users/:id', async (req, res) => {
    const { username, email } = req.body;
    await updateUser(req.params.id, username, email);
    res.json({ message: 'User updated' });
});

app.delete('/users/:id', async (req, res) => {
    await deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
});

/** FRIENDS ROUTES **/
app.post('/friends', async (req, res) => {
    const { requesterId, receiverId } = req.body;
    await sendFriendRequest(requesterId, receiverId);
    res.json({ message: 'Friend request sent' });
});

app.put('/friends', async (req, res) => {
    const { requesterId, receiverId, status } = req.body;
    await updateFriendRequestStatus(requesterId, receiverId, status);
    res.json({ message: 'Friend request updated' });
});

app.delete('/friends', async (req, res) => {
    const { requesterId, receiverId } = req.body;
    await removeFriend(requesterId, receiverId);
    res.json({ message: 'Friend removed' });
});

/** COLLECTIONS ROUTES **/
app.post('/collections', async (req, res) => {
    const { userId, name, description, icon } = req.body;
    const collectionId = await createCollection(userId, name, description, icon);
    res.json({ collectionId });
});

app.get('/collections/:userId', async (req, res) => {
    const collections = await getCollectionsByUser(req.params.userId);
    res.json(collections);
});

app.put('/collections/:id', async (req, res) => {
    const { name, description } = req.body;
    await updateCollection(req.params.id, name, description);
    res.json({ message: 'Collection updated' });
});

app.delete('/collections/:id', async (req, res) => {
    await deleteCollection(req.params.id);
    res.json({ message: 'Collection deleted' });
});

/** ITEMS ROUTES **/
app.post('/items', async (req, res) => {
    const { collectionId, name, description, imageUrl, barcode, acquisitionDate, estimatedValue } = req.body;
    const itemId = await addItem(collectionId, name, description, imageUrl, barcode, acquisitionDate, estimatedValue);
    res.json({ itemId });
});

app.get('/items/:collectionId', async (req, res) => {
    const items = await getItemsByCollection(req.params.collectionId);
    res.json(items);
});

app.put('/items/:id', async (req, res) => {
    const { name, description, estimatedValue } = req.body;
    await updateItem(req.params.id, name, description, estimatedValue);
    res.json({ message: 'Item updated' });
});

app.delete('/items/:id', async (req, res) => {
    await deleteItem(req.params.id);
    res.json({ message: 'Item deleted' });
});

/** START SERVER **/
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
