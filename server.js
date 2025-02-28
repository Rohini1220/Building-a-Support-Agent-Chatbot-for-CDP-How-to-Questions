require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const DOC_SOURCES = {
    segment: "https://segment.com/docs/?ref=nav",
    mparticle: "https://docs.mparticle.com/",
    lytics: "https://docs.lytics.com/",
    zeotap: "https://docs.zeotap.com/home/en-us/"
};

// Predefined answers for "how-to" questions
const FAQ_ANSWERS = {
    "set up a new source in segment": `To set up a new source in Segment:\n1. Log in to Segment.\n2. Go to **Sources** in the dashboard.\n3. Click **Add Source** and select the data source.\n4. Follow the setup instructions for the chosen source.\nFor detailed steps, visit: ${DOC_SOURCES.segment}`,

    "create a user profile in mparticle": `To create a user profile in mParticle:\n1. Log in to the mParticle dashboard.\n2. Navigate to **User Profiles**.\n3. Click **Create New Profile** and enter user details.\n4. Save the profile to track user data.\nFor more details, visit: ${DOC_SOURCES.mparticle}`,

    "build an audience segment in lytics": `To build an audience segment in Lytics:\n1. Go to **Audiences** in the Lytics dashboard.\n2. Click **Create Audience**.\n3. Define rules based on user behavior or attributes.\n4. Save and activate the segment.\nFor a complete guide, visit: ${DOC_SOURCES.lytics}`,

    "integrate my data with zeotap": `To integrate data with Zeotap:\n1. Sign in to Zeotap’s platform.\n2. Navigate to **Data Integrations**.\n3. Choose your data source and follow the integration steps.\n4. Verify and activate the integration.\nFor official docs, visit: ${DOC_SOURCES.zeotap}`
};

// Function to match user questions
function getAnswer(question) {
    const lowerCaseQ = question.toLowerCase();
    for (const key in FAQ_ANSWERS) {
        if (lowerCaseQ.includes(key)) {
            return FAQ_ANSWERS[key];
        }
    }
    return "I can answer questions related to Segment, mParticle, Lytics, or Zeotap. Please ask a 'how-to' question.";
}

// API to handle user questions
app.post('/ask', (req, res) => {
    const { question } = req.body;
    if (!question) return res.json({ answer: "Please enter a valid question." });

    const answer = getAnswer(question);
    return res.json({ answer });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))