import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

const userController = new UserController;

router.get("/", userController.findAll.bind(userController));

router.get("/:id", userController.findById.bind(userController));

router.post("/", userController.create.bind(userController));

export default router;