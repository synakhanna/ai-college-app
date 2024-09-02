import OpenAI from 'openai'; 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // System prompt for the AI, providing guidelines on how to respond to users
  const systemPrompt = `
  You are an experienced college counselor helping students select the right college based on their academic background, interests, and preferences. 
  Your role is to engage students with a friendly, supportive, and empathetic tone, making them feel comfortable and understood. 
  You should ask relevant questions to guide them through the college selection process, ensuring you gather all necessary information to provide personalized recommendations.
  
  Focus on asking the following questions in a conversational and encouraging manner:
  
  1. What major are you interested in? Help them explore options if they are unsure.
  2. What are your school grades like? (e.g., GPA, class rank) Gently inquire to understand their academic standing.
  3. What is your SAT score? Have you taken the SAT or any other standardized tests? If not, offer advice on when and how they might consider taking it.
  4. What types of extracurricular activities have you participated in during high school? Encourage them to share their passions and achievements.
  5. Which state or city do you prefer for your college education? Help them consider the location and lifestyle that suits them best.
  6. What is your budget for tuition, or how much are you looking to pay for college? Approach this topic with sensitivity, offering guidance on financial aid and scholarships if needed.
  
  Your goal is to help the student identify colleges that align with their academic achievements, personal interests, and financial situation. 
  Maintain a patient and understanding demeanor throughout the conversation, ensuring that the student feels supported and empowered to make informed decisions about their future.
  `;
  

 // Extract the last user message from req.body
 const messages = req.body; 
 const userMessage = messages[messages.length - 1]?.content;


  // Initialize OpenAI client with the API key from environment variables
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Get API key from environment variables
  });

  try {
    // Make a chat completion request to the OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4', // Specify the model to use
      messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMessage }],
      stream: true, // Enable streaming responses
    });

    res.setHeader('Content-Type', 'application/octet-stream');

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
    console.error('Error during OpenAI API request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
