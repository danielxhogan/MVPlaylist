import mongoose from 'mongoose';

const dbConnect = async () => {
  console.log('inside dbConnect');
  if (mongoose.connection.readyState > 1) { return; }

  await mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected to atlas mongodb'));
};

export default dbConnect;
