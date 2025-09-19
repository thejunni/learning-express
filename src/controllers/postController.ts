import { Request, Response } from 'express';
import prisma from '../config/database';

export const getPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: { author: true, comments: true },
  });
  res.json(posts);
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;
  try {
    const post = await prisma.post.create({
      data: { title, content, authorId },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Invalid user ID' });
  }
};
