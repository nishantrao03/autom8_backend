const { mongoose } = require('../db/mongo');

const { Schema } = mongoose;

// UserDetails schema
// Stores mapping between Firebase UID and app-specific data
const userDetailsSchema = new Schema(
  {
    uid: { type: String, required: true, unique: true }, // Firebase UID
    name: { type: String, default: '' },
    // chats: array of chat ids (store as ObjectId references if you create a Chat model,
    // otherwise store as strings). Using String to be flexible for now.
    chats: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserDetails', userDetailsSchema);
