import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
    topicId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Topic', 
        required: true 
    },
    title: { type: String, required: true }, 
    notes: { type: String, required: true },
    resources: [{ type: String }]            
}, { timestamps: true });

const Module = mongoose.models.Module || mongoose.model('Module', moduleSchema);
export default Module;
