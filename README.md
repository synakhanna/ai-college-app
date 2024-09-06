# CollegeGenie 🧞

Welcome to **CollegeGenie**, an AI-powered web application designed to help you find the right colleges, streamline applications, and achieve success in your college journey.

## Features

- **College Search & Matching**: Find the perfect college based on your interests, location, and academic goals using our AI-powered search.
- **Personalized Application Assistance**: Receive personalized guidance and tips for every part of your application, from essays to recommendation letters.
- **AI-Powered Essay Reviews**: Get feedback on your college essays from our AI tool that provides suggestions for improving clarity, tone, and impact.
- **Scholarship Finder**: Discover scholarships that you qualify for based on your background and academic achievements.
- **Interview Preparation**: Prepare for college interviews with AI-generated practice questions and tips to help you feel confident.
- **Network**: Build your network by connecting with other fellow students.

## Getting Started

### Prerequisites

- **Node.js** (v14.x or higher) and **npm** installed.
- A Firebase project set up with Firestore enabled.
- A Clerk account for authentication.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/ai-college-app.git
   cd ai-college-app

   ```

2. **Install dependencies**:
   npm install

3. **Set up environment variables:**
   Create a .env.local file and add the following credentials:

   COLLEGE_SCORECARD_API_KEY=
   OPEN_API_KEY=
   OPENAI_API_KEY=
   PINECONE_API_KEY=
   OPENROUTER_API_KEY=
   HUGGINGFACE_API_KEY=

   Create a .env file and add the following credentials:

   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
   STRIPE_SECRET_KEY=
   COLLEGE_SCORECARD_API_KEY=
   OPENAI_API_KEY=
   MONGODB_URI=
   PINECONE_API_KEY=

4. **Run the app:**:

   npm run dev

   The live server will be available at http://localhost:3000.

### Creating Profile

- 1.  Sign up/Login to your account from the landing page.
- 2.  Navigate to the "Profile" page.
- 3.  Fill out the forum.

### College Matching

- Go to the "College" page to see all the colleges which best fit your profile.
- Like colleges to add to favorites

### Counseling

- Go to the "Counselor" page to speak to your personalized Genie (counselor).
- Ask questions about essays, finances, extracurriculars, and more.

### Networking

- Go to the "Network" page to view other users.
- Connect with them on LinkedIn.

### Billing

- Go to the "Billing" page to see your account billing information.
- Subscribe/Unsubscribe to CollegeGenie.

### Tools/Technologies Used 🛠️

- Next.js: Framework for building the app.
- Stripe: For payment transactions and subcription management.
- Clerk: Authentication service for secure user sign-in.
- React: For building interactive UI components.
- Tailwind CSS: For styling the app.
- MongoDB: Storing User information and displaying them in the network page.
- Retrieval-Augmented Generation (RAG): AI framework used to retreive LLMs to produce better result so the counselor can respond more accurately.
- OpenAI: Used to create the counselor
- Postman: software application used to test each indivual APIs.

## Contribution by 🤝

### Fatima Riaz

### Syna Khanna

### Mukut Chowdhury

### Tahmidur Rabb
