import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isHost: {
    type: Boolean,
    default: false
    
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
