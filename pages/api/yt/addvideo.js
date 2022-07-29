import nc from 'next-connect';
import dbConnect from '../../../models/db';
import { addVideo } from '../../../controllers/yt/ytControllers';

console.log('inside addVideo endpoint');

const handler = nc();
dbConnect();


console.log('after connect');

handler.post(addVideo);

export default handler;
