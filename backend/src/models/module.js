import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    difficulty: { 
        type: String, 
        enum: ['beginner', 'medium', 'advanced'], 
    }
}, { timestamps: true });

const Module = mongoose.models.Module || mongoose.model('Module', moduleSchema);

export default Module;
