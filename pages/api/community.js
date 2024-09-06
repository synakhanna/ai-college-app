// pages/api/users/[communityId].js

import connectDB from '../../lib/mongodb';// your MongoDB connection file
import User from '../../models/User'; // your User model
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Find all users where socialMediaTags exists and is not empty
    const users = await User.find(
      { socialMediaTags: { $exists: true, $ne: [] } }, // Filter users with socialMediaTags not empty
      'fullName email academicTrack academicInfo socialMediaTags' // Return only specific fields
    );

    if (!users.length) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
