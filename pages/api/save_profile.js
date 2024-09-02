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

      const { userId } = getAuth(req); // Retrieve the clerkId from the session/auth context
      const {
        fullName,
        email,
        academicTrack,  
        gpa,
        satScore,
        helpNeeded,  
        addresses,  
        tuition,  
        suggestedColleges,
        socialMediaTags,
      } = req.body;

      const communityId = generateCommunityId(); // Function to generate communityId

      // Use findByIdAndUpdate with upsert: true
      const newUser = await User.findByIdAndUpdate(
        userId,
        {
          _id: userId, // Set _id to clerkId
          fullName,   
          email,      
          academicInfo: { gpa, satScore },
          academicTrack: academicTrack,
          help: helpNeeded,
          addresses: addresses,
          desiredTuition: tuition,
          communityId,
          suggestedColleges,
          socialMediaTags,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true } // Upsert and create a new document if not existing
      );

      res.status(200).json({ success: true, message: 'Profile saved successfully.', user: newUser });
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
