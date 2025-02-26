import { model } from '@angular/core';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const destinationSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  cc: String,
  type: Number,
  lastModif: { type: Date, default: Date.now },
});

const Destination = model('Destination', destinationSchema);

export default Destination;
