import Topic from "../models/topic.js";
import { generateLessonPlan } from "../services/generateNotes.js";

const getNotes = async (req, res) => {
  try {
    console.log(req.user);
    const allTopics = await Topic.find({ createdBy: req.user.id });
    res.status(200).json({ topics: allTopics, message: "topics received" });
  } 
  catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.error("Error in getNotes:", error);
  }
};

const topicNotes = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const topicExist = await Topic.findOne({ name: topic });
    if (topicExist) {
      return res.status(409).json({ message: "Topic already exists" });
    }
    
    const lessonPlan = await generateLessonPlan(topic);

    await Topic.create({
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

export { getNotes, topicNotes };
