import { Request, Response } from "express";
import prisma from "../config/database";

export const getComments = async (req: Request, res: Response) => {
  const comments = await prisma.comment.findMany({
    include: { post: true, user: true }
  });
  res.json(comments);
};

export const createComment = async (req: Request, res: Response) => {
  const { text, postId, userId } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: { text, postId, userId }
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: "Invalid postId or userId" });
  }
};
