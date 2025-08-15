import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    difficulty: { 
        type: String, 
        enum: ['beginner', 'medium', 'advanced'], 
        required: true 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, { timestamps: true });

const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema);

export default Topic;
