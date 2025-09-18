import { Router } from "express";
import { createMedia, getById, getMedia } from "../controllers/mediaController";

const router = Router();

router.get("/", getMedia);
router.post("/", createMedia);
router.get("/:id", getById);

export default router;
