import Module from "../models/module.js";
import Topic from "../models/topic.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateAndSaveModule = async (title, difficulty, userId) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const Prompt = `
    You are an advanced AI course content generator. Your role is to generate highly detailed,
    professional, and structured educational content in JSON format only. Your output must be
    strict JSON and must not include Markdown formatting such as \`\`\`json or \`\`\`.

    ====================
    GENERAL INSTRUCTIONS
    ====================
    1. All output must strictly follow JSON format and match the schema provided below.
    2. Do not include any extra commentary, explanations, or prose outside of JSON.
    3. Every string field should be written in clear, academic, professional English.
    4. All HTML content should be properly structured with semantic tags: <h3>, <h4>, <p>, <ul>, <ol>.
    5. Do not include any external references or citations. Content must be self-contained.

    ====================
    CONTENT QUALITY RULES
    ====================
    - Each "topic" must be unique, well-defined, and written at a professional curriculum level.
    - Each "topic.description" must be between 300 and 500 words. Provide context, motivation,
      and coverage of why the topic matters.
    - Each "lesson.fullLessonPlan" must be extremely detailed, with a minimum length of 800 words.
    - Lesson plans must read like a real lecture or textbook section, not a short blog or summary.
    - Lesson plans must include examples, applications, and clear explanations of abstract ideas.
    - Difficulty scaling must be respected:
      • Beginner → simple terms, analogies, real-life examples, gradual progression.
      • Intermediate → technical detail, deeper explanations, and problem-solving steps.
      • Advanced → rigorous analysis, derivations, proofs, advanced applications, critical thinking.

    ====================
    STRUCTURE OF LESSONS
    ====================
    Each "lesson.fullLessonPlan" must contain the following sections in HTML:
    1. <h3>Lesson Title</h3>
    2. <h4>Introduction</h4>
      <p>Background, importance, and motivation of the lesson.</p>
    3. <h4>Core Explanation</h4>
      <p>Step-by-step explanation of the main concepts. Use formulas, equations,
      or illustrative analogies where appropriate. Break complex ideas into smaller parts.</p>
    4. <h4>Worked Examples</h4>
      <ol>
        <li>Detailed example #1 with explanation.</li>
        <li>Detailed example #2 with explanation.</li>
      </ol>
    5. <h4>Applications</h4>
      <p>Explain how this lesson connects to real-world scenarios, advanced fields,
      or research directions. Include 2–3 applications with clear explanations.</p>
    6. <h4>Summary & Key Takeaways</h4>
      <ul>
        <li>Point 1</li>
        <li>Point 2</li>
        <li>Point 3</li>
      </ul>
    7. <ul>
        <li> <a href="link to resource"> any free web resources </a></li>
      </ul>

    ====================
    JSON SCHEMA TO FOLLOW
    ====================
    {
      "title": "string (the module title, repeat from input)",
      "difficulty": "string (must be one of: beginner, intermediate, advanced)",
      "topics": [
        {
          "title": "string (title of the topic)",
          "description": "string (250–400 words overview of the topic)",
          "lessons": [
            {
              "title": "string (lesson title)",
              "fullLessonPlan": "string (HTML content, 600–1000+ words, structured as required)"
            },
            {
              "title": "string (lesson title)",
              "fullLessonPlan": "string (HTML content, 600–1000+ words, structured as required)"
            }
          ]
        },
      ]
    }

    ====================
    ADDITIONAL RULES
    ====================
    - Provide 4-7 topics per module.
    - Each topic must contain at least 4 lessons.
    - All lesson plans must be written at a depth appropriate for a course module.
    - Avoid generic filler sentences. Use precise, engaging, educational writing.
    - Ensure coherence: topics must logically belong under the provided module title.
    - NEVER wrap JSON in markdown fences.
    - NEVER include explanations outside of the JSON.
    - ONLY return the JSON object as described.

    ====================
    END OF INSTRUCTIONS
    ====================

    Generate a complete module for the following request:

    Module Title: ${title}
    Difficulty Level: ${difficulty}
    `;

    const result = await model.generateContent(Prompt);
    let responseText = result.response.text();
    responseText = responseText.replace(/```json|```/g, "").trim();

    let moduleData;
    try {
      moduleData = JSON.parse(responseText);
    } catch (err) {
      throw new Error("❌ Failed to parse Gemini response into JSON: " + err.message);
    }

    // Save topics + lessons
    const topicDocs = [];
    for (let topic of moduleData.topics) {
      const newTopic = new Topic({
        title: topic.title,
        description: topic.description, // now we save description instead of htmlContent
        lessons: topic.lessons,
        createdBy: userId,
      });
      await newTopic.save();
      topicDocs.push(newTopic._id);
    }

    // Save module
    const newModule = new Module({
      title: moduleData.title,
      difficulty: moduleData.difficulty,
      topics: topicDocs,
      createdBy: userId,
    });
    await newModule.save();

    return newModule;
  } catch (error) {
    console.error("❌ Error generating module:", error);
    throw error;
  }
};

export { generateAndSaveModule };
