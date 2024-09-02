import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // Set _id to clerkId
  stripeId: { type: String, default: '' },
  fullName: { type: String, required: true },  // Full Name from Clerk
  email: { type: String, required: true },     // Email from Clerk
  academicInfo: {
    gpa: { type: Number, required: true },
    satScore: { type: Number, required: false },
  },
  academicTrack: { type: String, required: true }, // Academic track (could be multiple)
  help: [{ type: String, required: true }], // Help options
  desiredTuition: { type: Number, required: true },
  addresses: {
    city: {
      type: String,
    },
    state: {
      type: String,
    }
  },
  suggestedColleges: {
    type: [mongoose.Schema.Types.Mixed], // Suggested colleges
  },
  dateCreated: { type: Date, default: Date.now },
  communityId: { type: String, required: true },
  socialMediaTags: [{ type: String }], // Social media tags
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
