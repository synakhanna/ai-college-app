import { getAuth } from '@clerk/nextjs/server';
import mongoose from 'mongoose';
import User from '../../models/User'; // Adjust this path based on where you saved the user schema
// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectDB();

      const { userId } = getAuth(req); // Assuming you have an auth method to get the userId
      const {
        fullName,
        email,
        academicTrack,  // This will be mapped to academicTrack
        gpa,
        satScore,
        helpNeeded,  // This will be mapped to help
        addresses,  // This will be mapped to addresses
        tuition,  // This will be mapped to desiredTuition
        suggestedColleges,
        socialMediaTags,
      } = req.body;

      const communityId = generateCommunityId(); // Function to generate communityId

      const newUser = new User({
        clerkId: userId,
        fullName,   // Full name from Clerk or frontend
        email,      // Email from Clerk or frontend
        academicInfo: { gpa, satScore },
        academicTrack: academicTrack, // Mapped to academicTrack
        help: helpNeeded,  // Mapped to help
        addresses: addresses,  // Mapped to addresses
        desiredTuition: tuition,  // Mapped to desiredTuition
        communityId,
        suggestedColleges,
        socialMediaTags, // Save social media tags
      });

      await newUser.save();

      res.status(200).json({ success: true, message: 'Profile saved successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error saving profile.' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
  }
}

function generateCommunityId() {
  // Implement your logic to generate a random token or ID for the communityId
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
