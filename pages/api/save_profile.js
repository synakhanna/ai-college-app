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

      const { userId } = getAuth(req);
      const {
        major,
        gpa,
        satScore,
        helpNeeded,
        preferredLocation,
        tuition,
      } = req.body;

      const communityId = generateCommunityId(); // You can create a function to generate this

      const newUser = new User({
        clerkId: userId,
        stripeId: '', // Add stripe logic later
        academicInfo: { gpa, satScore },
        help: helpNeeded,
        preferredLocations: preferredLocation.map(loc => loc.label),
        desiredTuition: tuition,
        communityId,
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
