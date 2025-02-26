const mongoose = require('mongoose');
const { Schema } = mongoose;

const destinationSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  description: String,
  cc: String,
  type: String,
  lastModif: { type: Date, default: Date.now },
});

const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;
