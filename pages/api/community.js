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

      // Find all users and return their fullName, email, academicTrack, academicInfo, and dateCreated
      const users = await User.find({}, 'fullName email academicTrack academicInfo dateCreated');

      if (!users.length) {
          return res.status(404).json({ message: 'No users found' });
      }

      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
}