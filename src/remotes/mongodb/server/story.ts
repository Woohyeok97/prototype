import { connectDB } from '../mongodb';
import { ObjectId } from 'mongodb';
// type & schema
import { StoryType } from '@/models';
import { StorySchema } from '@/remotes/schema';

// 스토리 리스트 가져오기
export const getUserStoryList = async (userId: string): Promise<StoryType[]> => {
  const db = (await connectDB).db('prototype');
  const response = await db.collection('story').find({ userId: userId }).toArray();
  return response.map(item => StorySchema.parse({ ...item, _id: item._id.toString() }));
};

// 스토리 단일 가져오기
export const getStoryById = async (storyId: string): Promise<StoryType> => {
  const db = (await connectDB).db('prototype');
  const response = await db.collection('story').findOne({ _id: new ObjectId(storyId) });
  return StorySchema.parse({ ...response, _id: response?._id.toString() });
};
