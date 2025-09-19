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

export const getMediaById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const media = await prisma.media.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!media || media.deletedAt) {
      return res.status(404).json({ error: 'media not found' });
    }

    return res.status(200).json(media);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteMedia = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await prisma.media.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });
    res.json({ message: 'Media deleted', deleted });
  } catch (error) {
    res.status(404).json({ error: 'Media not found' });
  }
};
