
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StorySchema = new Schema({
    _creator: { type: Number, ref: 'Person' },
    title: String,
    fans: [{ type: Number, ref: 'Person' }]
})

StorySchema.index({ id: 1 })

const Story = mongoose.model('story', StorySchema);
module.exports = Story;