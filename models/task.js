const mongoose = require('mongoose');
const config = require('../config/config');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const taskSchema = new mongoose.Schema({
  details: {
    type: String,
    required: true
  },
  ticket_url: {
    type: String,
    required: false
  },
  user_id: {
    type: String,
    required: true
  },
  project_name: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: true
  },
  week: {
    type: Number,
    required: true
  }
});

taskSchema.plugin(timestamps);
taskSchema.plugin(mongooseStringQuery);

const Task = mongoose.model(config.mongo.collections.task, taskSchema);
module.exports = Task;
