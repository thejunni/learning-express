import { Request, Response } from "express";
import prisma from "../config/database";

export const getUsers = async (req: Request, res: Response) => {
  // const users = await prisma.user.findMany();
  const users = await prisma.user.findMany({
    include: { posts: true, comments: true },
  });
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({ data: { name, email } });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Email already exists" });
  }
};
