import connectDB from '../../lib/mongodb';
import User from '../../models/User';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();

        const { userId } = getAuth(req);

        const user = await User.findOne({ _id: userId }, 'suggestedColleges').exec();

        if (user) {
            res.status(200).json(user.suggestedColleges);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}