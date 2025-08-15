import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    Title: { type: String, required: true }, 
    htmlContent: { type: String, required: true },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },            
}, { timestamps: true });

const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema);
export default Topic;
