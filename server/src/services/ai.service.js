// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// exports.generateExplanation = async ({ topic, prompt, level }) => {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//   const finalPrompt = `
// Explain the topic "${topic}".
// User level: ${level}

// Instructions:
// - Easy language
// - Step-by-step
// - Real-world analogy
// - Example
// - If coding topic, include C++ example

// Extra prompt from user:
// ${prompt}
// `;

//   const result = await model.generateContent(finalPrompt);
//   return result.response.text();
// };
// exports.generateExplanation = async ({ topic, prompt, level }) => {
//   //const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const finalPrompt = `
// Explain the topic "${topic}".
// User level: ${level}

// Instructions:
// - Easy language
// - Step-by-step
// - Real-world analogy
// - Example
// - If coding topic, include C++ example

// Extra prompt from user:
// ${prompt}
// `;

//   const result = await model.generateContent(finalPrompt);
//   return result.response.text();
// };



// const axios = require("axios");

// exports.generateExplanation = async ({ topic, prompt, level }) => {
//   try {
//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         // Using Gemini 1.5 Flash via OpenRouter for speed and reliability
//         model: "groq/compound-mini", 
//         messages: [
//           {
//             role: "user",
//             content: `Explain the topic "${topic}". User level: ${level}. 
//             Instructions: Use easy language, step-by-step logic, a real-world analogy, and provide a C++ example.
//             Extra user requirements: ${prompt}`
//           }
//         ]
//       },
//       {
//         headers: {
//           "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer": "http://localhost:5000", // Required by OpenRouter
//           "X-Title": "Student Tracker"
//         }
//       }
//     );

//     if (!response.data.choices || response.data.choices.length === 0) {
//       throw new Error("No response from AI model");
//     }

//     return response.data.choices[0].message.content;
//  } catch (error) {
//   // log the full response from OpenRouter to see the real cause
//   if (error.response) {
//     console.error("OpenRouter Details:", error.response.data);
//   } else {
//     console.error("Request Error:", error.message);
//   }
//   throw new Error("AI Service currently unavailable");
// }
// };
// console.log(
//   "GROQ KEY CHECK 👉",
//   process.env.GROQ_API_KEY,
//   process.env.GROQ_API_KEY?.startsWith("gsk_")
// );

// const axios = require("axios");

// exports.generateExplanation = async ({ topic, prompt, level }) => {
//   try {
//     const response = await axios.post(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         model: "llama-3.1-8b-instant",
//         messages: [
//           {
//             role: "user",
//             content: `Explain the topic "${topic}". 
// User level: ${level}.
// Use easy language, step-by-step logic, real-world analogy,
// and provide a C++ example.
// Extra user requirements: ${prompt}`
//           }
//         ]
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error("GROQ ERROR 👉", error.response?.data || error.message);
//     throw new Error("AI Service currently unavailable");
//   }
// };
const axios = require("axios");

exports.generateExplanation = async ({ topic, prompt, level }) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `Explain the topic "${topic}".
User level: ${level}.
Use very easy language, step-by-step logic,
a real-world analogy, and provide a C++ example.
Extra user requirements: ${prompt}`
          }
        ],
        temperature: 0.6,
        max_tokens: 800   // 🔥 THIS WAS MISSING
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("GROQ STATUS 👉", error.response?.status);
    console.error("GROQ DATA 👉", error.response?.data);

    throw new Error(
      error.response?.data?.error?.message ||
      "Groq API failed"
    );
  }
};
