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
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();

  const { userId } = getAuth(req); // Retrieve the clerkId from the session/auth context

  const { collegeKey, isFavorite } = req.body; // Get the unique college key and isFavorite value from the request body

  if (!userId || !collegeKey) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    // Find the user and get the suggestedColleges field
    const user = await User.findOne({ _id: userId }, 'suggestedColleges').exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the college in the user's suggestedColleges array using the unique college key
    const collegeIndex = user.suggestedColleges.findIndex(college => {
      const uniqueKey = `${college['school.name']}_${college['school.city']}_${college['school.state']}`;
      return uniqueKey === collegeKey;
    });

    if (collegeIndex === -1) {
      return res.status(404).json({ message: "College not found" });
    }

    // Update the isFavorite field for the found college
    user.suggestedColleges[collegeIndex].isFavorite = isFavorite;

    // Save the updated user document
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          suggestedColleges: user.suggestedColleges,
        },
      }
    );

    const user_colleges = await User.findOne({ _id: userId }, 'suggestedColleges').exec();

        if (user_colleges) {
            res.status(200).json(user.suggestedColleges);
        } else {
            res.status(404).json({ message: 'User not found' });
        }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
