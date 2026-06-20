const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

async function reactivate() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    
    // Use the exact same schema or just raw collection to avoid any schema issues
    const db = mongoose.connection.db;
    const collection = db.collection('users');
    
    const result = await collection.updateMany(
      { isActive: false }, 
      { $set: { isActive: true } }
    );
    
    console.log(`Reactivated ${result.modifiedCount} accounts.`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

reactivate();
