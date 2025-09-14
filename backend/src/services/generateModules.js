import Module from "../models/module.js";
import Topic from "../models/topic.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateAndSaveModule = async (title, difficulty, userId) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const Prompt = `
      You are an advanced AI course content generator. Your role is to generate highly detailed,
      professional, and structured educational content as a complete, standalone HTML document
      styled with modern Tailwind CSS. Your output must be strict HTML (a complete <!doctype html> page)
      and must not include Markdown formatting, JSON, or any prose outside of the HTML document.

      ====================
      GENERAL INSTRUCTIONS
      ====================
      1. Produce a single, valid, self-contained HTML document (<!doctype html> ... </html>).
      2. Include Tailwind CSS for styling using the official CDN (or equivalent modern Tailwind setup).
      3. Do not include any comments, notes, or extra text outside the HTML.
      4. All textual content must be written in clear, academic, professional English.
      5. Use semantic HTML5 structure (<header>, <main>, <section>, <article>, <nav>, <footer>, etc.).
      6. Ensure the HTML is accessible and responsive. Use appropriate ARIA attributes where needed.
      7. Use Tailwind utility classes for layout, spacing, typography, colors, and responsive design.
      8. Provide a consistent, modern visual design (clean typography, cards, grid/list layouts, readable code blocks if any).
      9. Include a top-level module header that displays the Module Title and Difficulty Level.
      10. Ensure every content element (topics, lessons) is present in the HTML so it can be rendered as a course module page.

      ====================
      CONTENT QUALITY RULES
      ====================
      - The document must contain 4–7 topics for the module.
      - Each topic must contain at least 4 lessons.
      - Each topic must be unique, well-defined, and logically belong under the provided module title.
      - Each topic must include a topic description between 300 and 500 words (place this description in a <p> within the topic section).
      - Each lesson must include a full lesson plan written as HTML content and follow the "STRUCTURE OF LESSONS" below.
      - Each lesson full text should be substantial: aim for at least 600–1000+ words per lesson (longer is acceptable where required).
      - Avoid generic filler. Use precise, educational writing with examples, applications, and clear explanations.
      - Difficulty scaling must be observed across lessons labeled beginner/intermediate/advanced where applicable.

      ====================
      STRUCTURE OF LESSONS (required HTML structure within every lesson)
      ====================
      Each lesson's content must contain these sections in semantic HTML and styled with Tailwind:
      1. <h3>Lesson Title</h3>
      2. <h4>Introduction</h4>
        <p>Background, importance, and motivation of the lesson.</p>
      3. <h4>Core Explanation</h4>
        <p>Step-by-step explanation of the main concepts. Use formulas, equations, or illustrative analogies where appropriate. Break complex ideas into smaller parts.</p>
      4. <h4>Worked Examples</h4>
        <ol>
          <li>Detailed example #1 with explanation.</li>
          <li>Detailed example #2 with explanation.</li>
        </ol>
      5. <h4>Applications</h4>
        <p>Explain how this lesson connects to real-world scenarios, advanced fields, or research directions. Include 2–3 applications with clear explanations.</p>
      6. <h4>Summary & Key Takeaways</h4>
        <ul>
          <li>Point 1</li>
          <li>Point 2</li>
          <li>Point 3</li>
        </ul>
      7. A short resources list:
        <ul>
          <li><a href="#" rel="noopener noreferrer">Any free web resource (placeholder)</a></li>
        </ul>

      Notes:
      - All of the above should be present for every lesson and be clearly styled and legible.
      - Mathematical expressions may be presented using plain text or minimal inline math notation (no external JS math renderers required).
      - Keep links as placeholders (#) unless the prompt supplies specific URLs.

      ====================
      PAGE FEATURES (must include)
      ====================
      - A header that shows the module title and difficulty (use placeholders ${title} and ${difficulty} so they can be programmatically substituted).
      - A responsive Table of Contents (TOC) or navigation panel linking to each topic and each lesson anchor on the page.
      - A clear per-topic area: topic title, description, and a collapsible or card-based list of lessons.
      - Each lesson rendered in an expanded card or article with the required structure.
      - A theme accent color variable using Tailwind classes (you may include a small inline <style> that sets CSS variables if needed).
      - Print-friendly styles (basic adjustments for readable print output).
      - Minimal client-side interactivity using vanilla JS for features like TOC scrolling, collapse/expand topic cards, and "back to top" — keep JS compact and inline within a <script> tag.
      - No external JavaScript frameworks. Using small utility JS is allowed.

      ====================
      CONTENT SCOPE
      ====================
      - Generate a complete module based on the following inputs (substitute the placeholders inside the HTML):
        Module Title: ${title}
        Difficulty Level: ${difficulty}
      - Ensure topics and lessons align with the module title and difficulty.
      - Ensure academic tone and that lessons could be used as real lecture/textbook material.

      ====================
      OUTPUT RULES
      ====================
      - Return only the complete HTML document. Do not return any additional JSON, commentary, or explanation.
      - Do not include server-side code or build instructions — the output must be static HTML + Tailwind CDN + small inline JS/CSS only.
      - Make the HTML easily copy-pasteable into an .html file and viewable in a browser.

      ====================
      END OF INSTRUCTIONS
      ====================
      `;

    const result = await model.generateContent(Prompt);
    let responseText = result.response.text();
    responseText = responseText.replace(/```json|```/g, "").trim();

    let moduleData;
    try {
      moduleData = JSON.parse(responseText);
    } catch (err) {
      throw new Error(
        "❌ Failed to parse Gemini response into JSON: " + err.message
      );
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
