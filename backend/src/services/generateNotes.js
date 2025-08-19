import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv'; 

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const lessonPrompt = `Act as an experienced instructional designer, curriculum architect, and subject matter expert. I will provide a topic or concept, and your task is to generate a comprehensive, structured lesson plan designed for digital delivery. The lesson must follow this detailed structure and be rich in content, educational theory, and learner engagement strategies:

1. Lesson Title (Compelling & Relevant)
    • Generate an engaging and informative title that reflects the core theme and purpose of the lesson.
    • It should balance clarity, relevance, and curiosity, suitable for a digital education platform.

2. Lesson Overview / Description
    • Write a 150–200 word description that:
    • Clearly introduces the topic/concept.
    • Explains why the topic is important (contextual and real-world relevance).
    • Outlines what learners will gain from the lesson.
    • Links the lesson to broader subject areas or curricula.

3. Learning Outcomes (SMART Objectives)
    • List 5–7 specific, measurable learning objectives.
    • Each outcome should:
    • Use active verbs (e.g., analyze, compare, synthesize, create).
    • Reflect cognitive levels (Bloom’s Taxonomy: Remember, Understand, Apply, Analyze, Evaluate, Create).
    • Be suitable for assessment and evaluation.

4. Key Concepts, Definitions & Terminology
    • Provide an exhaustive list of 10–15 critical concepts or terms, each with:
    • A precise definition.
    • A brief explanation of its importance in context.
    • If relevant, include visual aids suggestions or analogies for explanation.

5. In-depth Content Breakdown
    • Divide the lesson into logical sub-sections or modules.
    • For each sub-section:
    • Give a title.
    • Write a detailed explanation (~150–300 words).
    • Include key insights, potential learner questions, and embedded knowledge checks (MCQs, True/False, reflection prompts).
    • Suggest media enhancements (e.g., diagrams, videos, simulations).

6. Interactive Learning Activities
    • Design 3–5 engaging learning tasks such as:
    • Case studies
    • Simulations
    • Data analysis
    • Role-play or collaborative activities (if applicable)
    • Each activity must include:
    • A description of the task
    • Learning purpose
    • Step-by-step instructions
    • Expected outcome or reflection

7. Real-World Examples & Case Studies
    • Provide 2–3 detailed real-world scenarios where the topic is applied.
    • Each should:
    • Include context and background
    • Explain what makes it relevant
    • Ask learners reflection questions or design challenges

8. Target Audience
    • Define the ideal learners for this lesson:
    • Age/education level
    • Professional/academic background
    • Prior knowledge and learning goals

9. Prerequisites
    • List any necessary background knowledge, skills, or tools needed.
    • Provide brief review links or summary refreshers for those who may lack them.

10. Estimated Duration
    • Provide a realistic time estimate broken down by:
    • Reading / Lecture (~X minutes)
    • Activities (~X minutes)
    • Assessments (~X minutes)
    • Total estimated completion time

11. Assessment Strategy
    • Recommend formative and summative assessment types:
    • 3–5 sample quiz/test questions
    • Project-based assessment idea
    • Rubrics or grading suggestions

12. Further Reading & Resources
    • Suggest articles, research papers, videos, or courses that learners can use to go deeper.
    • Include brief descriptions and relevance.

Format your output using clear headings and subheadings, bullet points where appropriate, and markdown for readability. Ensure depth, coherence, and pedagogical strength throughout the content. The lesson should be immediately usable in an LMS, learning platform, or classroom setting.
Give the response in HTML formatting, add in the tables and bullet points where necessary. Use a professional tone and ensure the content is suitable for an educational audience. Only send the HTML response, only provide the body of the HTML document, and don't use \\n or any other escape characters.`;


const generateLessonPlan = async (topic) => {
    if(!topic) {
        throw new Error("Topic is required to generate a lesson plan.");
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `${lessonPrompt}\n\n Topic: ${topic}`;

    const res = await model.generateContent(prompt);
    const response = await res.response;

    return response.text();
}



export { generateLessonPlan };