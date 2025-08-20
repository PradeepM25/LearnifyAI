import QuickNote from "../models/quickNotes.js";
import { generateLessonPlan } from "../services/generateNotes.js";

const getQuickNotes = async (req, res) => {
  try {
    console.log(req.user);
    const allTopics = await QuickNote.find({ createdBy: req.user.id });
    res.status(200).json({ topics: allTopics, message: "topics received" });
  } 
  catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.error("Error in getNotes:", error);
  }
};

const generateQuickNotes = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const topicExist = await QuickNote.findOne({ Title: topic });
    if (topicExist) {
      return res.status(402).json({ message: "Topic already exists" });
    }
    
    const lessonPlan = await generateLessonPlan(topic);

    await QuickNote.create({
      Title: topic,
      htmlContent: lessonPlan,
      createdBy: req.user.id
    });

    res.status(200).json({ lessonPlan });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.error("Error in topicNotes:", error);
  }
};

export { getQuickNotes, generateQuickNotes };
