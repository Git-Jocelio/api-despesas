import { Router } from "express";
import { ExpenseController } from "../controllers/ExpenseController";

const router = Router();

const expenseController = new ExpenseController;

router.get("/", expenseController.findAll.bind(expenseController));

router.get("/user/:userId", expenseController.findByUserId.bind(expenseController));

router.get("/:id", expenseController.findById.bind(expenseController));

router.post("/", expenseController.create.bind(expenseController));

export default router;