import nc from 'next-connect';
import dbConnect from '../../../models/db';
import { getVideos } from '../../../controllers/yt/ytControllers';

console.log('inside addVideo endpoint');

const handler = nc();
dbConnect();


console.log('after connect');

handler.get(getVideos);

export default handler;
