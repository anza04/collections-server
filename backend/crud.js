const mysql = require('mysql2/promise');

// Database connection
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'dbUser',
    password: 'F3d3r1c0', // Change according to your setup
    database: 'collectionApp_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/** USERS CRUD **/
async function getAllUsers() {
    const [rows] = await pool.execute('SELECT * FROM Users');
    return rows;
}

async function createUser(username, email, passwordHash) {
    const sql = 'INSERT INTO Users (Username, Email, PasswordHash) VALUES (?, ?, ?)';
    const [result] = await pool.execute(sql, [username, email, passwordHash]);
    return result.insertId;
}

async function getUser(userId) {
    const sql = 'SELECT * FROM Users WHERE UserID = ?';
    const [rows] = await pool.execute(sql, [userId]);
    return rows[0];
}

async function updateUser(userId, username, email) {
    const sql = 'UPDATE Users SET Username = ?, Email = ? WHERE UserID = ?';
    await pool.execute(sql, [username, email, userId]);
}

async function deleteUser(userId) {
    const sql = 'DELETE FROM Users WHERE UserID = ?';
    await pool.execute(sql, [userId]);
}

/** FRIENDS CRUD **/
async function sendFriendRequest(requesterId, receiverId) {
    const sql = 'INSERT INTO Friends (RequesterID, ReceiverID) VALUES (?, ?)';
    await pool.execute(sql, [requesterId, receiverId]);
}

async function updateFriendRequestStatus(requesterId, receiverId, status) {
    const sql = 'UPDATE Friends SET Status = ? WHERE RequesterID = ? AND ReceiverID = ?';
    await pool.execute(sql, [status, requesterId, receiverId]);
}

async function removeFriend(requesterId, receiverId) {
    const sql = 'DELETE FROM Friends WHERE RequesterID = ? AND ReceiverID = ?';
    await pool.execute(sql, [requesterId, receiverId]);
}

/** COLLECTIONS CRUD **/
async function createCollection(userId, name, description, icon) {
    const sql = 'INSERT INTO Collections (UserID, Name, Description, Icon) VALUES (?, ?, ?, ?)';
    const [result] = await pool.execute(sql, [userId, name, description, icon]);
    return result.insertId;
}

async function getCollectionsByUser(userId) {
    const sql = 'SELECT * FROM Collections WHERE UserID = ?';
    const [rows] = await pool.execute(sql, [userId]);
    return rows;
}

async function updateCollection(collectionId, name, description) {
    const sql = 'UPDATE Collections SET Name = ?, Description = ? WHERE CollectionID = ?';
    await pool.execute(sql, [name, description, collectionId]);
}

async function deleteCollection(collectionId) {
    const sql = 'DELETE FROM Collections WHERE CollectionID = ?';
    await pool.execute(sql, [collectionId]);
}

/** ITEMS CRUD **/
async function addItem(collectionId, name, description, imageUrl, barcode, acquisitionDate, estimatedValue) {
    const sql = 'INSERT INTO Items (CollectionID, Name, Description, ImageURL, Barcode, AcquisitionDate, EstimatedValue) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.execute(sql, [collectionId, name, description, imageUrl, barcode, acquisitionDate, estimatedValue]);
    return result.insertId;
}

async function getItemsByCollection(collectionId) {
    const sql = 'SELECT * FROM Items WHERE CollectionID = ?';
    const [rows] = await pool.execute(sql, [collectionId]);
    return rows;
}

async function updateItem(itemId, name, description, estimatedValue) {
    const sql = 'UPDATE Items SET Name = ?, Description = ?, EstimatedValue = ? WHERE ItemID = ?';
    await pool.execute(sql, [name, description, estimatedValue, itemId]);
}

async function deleteItem(itemId) {
    const sql = 'DELETE FROM Items WHERE ItemID = ?';
    await pool.execute(sql, [itemId]);
}

/** MARKETPLACE LISTINGS CRUD **/
async function createListing(userId, itemId, listingType, price, tradeWanted) {
    const sql = 'INSERT INTO MarketplaceListings (UserID, ItemID, ListingType, Price, TradeWanted) VALUES (?, ?, ?, ?, ?)';
    const [result] = await pool.execute(sql, [userId, itemId, listingType, price, tradeWanted]);
    return result.insertId;
}

async function getActiveListings() {
    const sql = 'SELECT * FROM MarketplaceListings WHERE Status = "active"';
    const [rows] = await pool.execute(sql);
    return rows;
}

async function updateListingStatus(listingId, status) {
    const sql = 'UPDATE MarketplaceListings SET Status = ? WHERE ListingID = ?';
    await pool.execute(sql, [status, listingId]);
}

async function deleteListing(listingId) {
    const sql = 'DELETE FROM MarketplaceListings WHERE ListingID = ?';
    await pool.execute(sql, [listingId]);
}

/** BLOCK USERS **/
async function blockUser(blockerId, blockedId) {
    const sql = 'INSERT INTO BlockedUsers (BlockerID, BlockedID) VALUES (?, ?)';
    await pool.execute(sql, [blockerId, blockedId]);
}

async function unblockUser(blockerId, blockedId) {
    const sql = 'DELETE FROM BlockedUsers WHERE BlockerID = ? AND BlockedID = ?';
    await pool.execute(sql, [blockerId, blockedId]);
}

module.exports = {
    getAllUsers, createUser, getUser, updateUser, deleteUser,
    sendFriendRequest, updateFriendRequestStatus, removeFriend,
    createCollection, getCollectionsByUser, updateCollection, deleteCollection,
    addItem, getItemsByCollection, updateItem, deleteItem,
    createListing, getActiveListings, updateListingStatus, deleteListing,
    blockUser, unblockUser
};
