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
