import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  stripeId: { type: String, default: '' },
  academicInfo: {
    gpa: { type: Number, required: true },
    satScore: { type: Number, required: false },
  },
  help: [{ type: String, required: true }],
  preferredLocations: [{ type: String }],
  desiredTuition: { type: Number, required: true },
  dateCreated: { type: Date, default: Date.now },
  communityId: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
