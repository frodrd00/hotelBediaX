import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Destination from './models/destination';
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect('mongodb://localhost:27017/hotelBediaX', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: any) => console.error('Error connecting to MongoDB', err));

app.get('/api/destination', async (req: Request, res: Response) => {
  try {
    const destination = await Destination.find();
    res.json(destination);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/destination', async (req: Request, res: Response) => {
  try {
    const newDestination = new Destination(req.body);
    newDestination._id = new mongoose.Types.ObjectId();
    await newDestination.save();
    res.status(201).json(newDestination);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch('/api/destination/:id', async (req: Request, res: Response) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedDestination) {
      res.json(updatedDestination);
    } else {
      res.status(404).send('Destination not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/api/destination/:id', async (req: Request, res: Response) => {
  try {
    const deletedDestination = await Destination.findByIdAndDelete(
      req.params.id
    );
    if (deletedDestination) {
      res.status(204).send();
    } else {
      res.status(404).send('Destination not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
