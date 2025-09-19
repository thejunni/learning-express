import { Request, Response } from 'express';
import prisma from '../config/database';

export const getMedia = async (req: Request, res: Response) => {
  const medias = await prisma.media.findMany({
    include: { post: true, user: true },
  });
  res.json(medias);
};

export const createMedia = async (req: Request, res: Response) => {
  const { name, postId, userId } = req.body;
  try {
    const media = await prisma.media.create({
      data: { name, postId, userId },
    });
    res.status(201).json(media);
  } catch (error) {
    res.status(400).json({ error: 'Invalid PostId or UserId' });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const media = await prisma.media.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(201).json(media);
  } catch (error) {
    res.status(404).json({ error: 'Invalid Id' });
  }
};
