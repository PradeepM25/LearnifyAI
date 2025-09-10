// controllers/moduleController.js
import { generateAndSaveModule } from "../services/generateModules.js";
import Module from "../models/module.js";

const addModule = async (req, res) => {
  const { title, difficulty } = req.body;

  try {
    const module = await generateAndSaveModule(title, difficulty, req.user.id);
    res.status(201).json({ message: "✅ Module generated & saved", module });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/modules/getAll
const getModules = async (req, res) => {
  try {
    const modules = await Module.find({ createdBy: req.user.id }).populate({
      path: "topics",
    });
    res.status(200).json({ modules });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addModule, getModules };
