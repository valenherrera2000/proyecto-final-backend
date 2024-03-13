import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthdate: { type: Date, required: false },
  avatar: { type: String, required: false },
  documents: [
    {
      name: String,
      reference: String,
      required: false,
    },
  ],
  last_connection: {
    type: Date,
  },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
}, { timestamps: true });

export default mongoose.model('User', userSchema);