import OpenAI from "openai";
import connectDB from "../../lib/mongodb";
import User from "../../models/User";
import { getAuth } from "@clerk/nextjs/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { getProgramLabel } from '../../lib/getProgramLabel';

export default async function handler(req, res) {
    const messages = req.body;
    const { userId } = getAuth(req);

    //Extract the latest user message
    const userMessage = messages[messages.length - 1]?.content;

    try {
    //Retrieve the user's saved college list
    await connectDB();
    const user = await User.findOne({ _id: userId });
    const savedCollegeList = user ? user.suggestedColleges : [];
    
    // Extracting additional user information from the database
    const { gpa, satScore } = user.academicInfo;
    const  academicTrack  = user.academicTrack;
    const { city, state } = user.addresses;
    const  fullName  = user.fullName;
    const  desiredTuition  = user.desiredTuition;
    const helpNeeded = user.help.join(", ");  // Convert the array to a string

    console.log("The academic track in db :"+academicTrack);
    console.log("The track returned from method :"+getProgramLabel(academicTrack));
    const academic_Track = getProgramLabel(academicTrack);

    

    //Initialize OpenAI client with the API key from environment variables
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, // Get API key from environment variables
    });

    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: userMessage,
        encoding_format: "float",
    });

    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });
    const index = pc.index("collegegenie-rag").namespace("ns1");

    const results = await index.query({
        topK: 5,
        includeMetadata: true,
        vector: embedding.data[0].embedding,
        includeMetadata: true,
    });

    //Extract relevant information from Pinecone results
    const relevantDocuments = results.matches.map((match) => match.metadata);

    //Combine the system prompt with the retrieved documents and saved college list
    const systemPrompt = `
        You are an experienced college counselor helping students select the right college based on their academic background, interests, and preferences. 
        Your role is to engage students with a friendly, supportive, and empathetic tone, making them feel comfortable and understood. 
        You should ask relevant questions to guide them through the college selection process, ensuring you gather all necessary information to provide personalized recommendations.

        Here is the student's academic information:
        - Full Name: ${fullName}
        - City, State: ${city}, ${state}
        - GPA: ${gpa}
        - SAT Score: ${satScore}
        - Desired Major: ${academic_Track}
        - Desired Tuition: ${desiredTuition}
        - Help Needed: ${helpNeeded}

        Here is the list of colleges previously saved by the user:
        ${JSON.stringify(savedCollegeList)}

        Here is some relevant information retrieved from the database:
        ${JSON.stringify(relevantDocuments)}

        Now, considering this information, respond to the user's query: "${userMessage}".
        `;

    // Make a chat completion request to the OpenAI API
    const completion = await openai.chat.completions.create({
        model: "gpt-4", // Specify the model to use
        messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
        ],
        stream: true, // Enable streaming responses
    });

    res.setHeader("Content-Type", "application/octet-stream");

    const encoder = new TextEncoder();

    for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
        const text = encoder.encode(content);
        res.write(text);
        }
    }

    res.end(); // End the response when done
    } catch (error) {
    console.error("Error during OpenAI API request:", error);
    res.status(500).json({ error: "Internal Server Error" });
    }
}