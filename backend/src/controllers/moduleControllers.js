// controllers/moduleController.js
import { generateAndSaveModule } from "../services/generateModules.js";

const addModule = async (req, res) => {
  const { title, difficulty } = req.body;

  try {
    const module = await generateAndSaveModule(title, difficulty, req.user.id);
    res.status(201).json({ message: "✅ Module generated & saved", module });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addModule };
