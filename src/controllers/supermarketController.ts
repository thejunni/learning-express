import { Request, Response } from 'express';
import prisma from '../config/database';

export const getSupermarket = async (req: Request, res: Response) => {
  const market = await prisma.supermarket.findMany({
    include: {
      user: true,
    },
  });
  res.json(market);
};

export const createSupermarket = async (req: Request, res: Response) => {
  const { name, userId, is_open, address } = req.body;
  try {
    const market = await prisma.supermarket.create({
      data: { name, userId, is_open, address },
    });
    res.status(201).json(market);
  } catch (error) {
    res.status(400).json({ error: 'Invalid user Id' });
  }
};

export const updateSupermarket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, userId, is_open, address } = req.body;
  try {
    const update = await prisma.supermarket.update({
      where: { id: Number(id) },
      data: { name, userId, is_open, address },
    });
    res.json(update);
  } catch (error) {
    res.status(404).json({ error: 'Supermarket not found' });
  }
};

export const getSupermarketById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const supermarket = await prisma.supermarket.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!supermarket || supermarket.deletedAt) {
      return res.status(404).json({ error: 'Supermarket not found' });
    }

    return res.status(200).json(supermarket);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteSupermarket = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await prisma.supermarket.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });
    res.json({ message: 'Supermarket deleted', deleted });
  } catch (error) {
    res.status(404).json({ error: 'Supermarket not found' });
  }
};
