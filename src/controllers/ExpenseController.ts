import { Request, Response } from "express";
import { ExpenseRepository } from "../repositories/ExpenseRepository";
import { UserRepository } from "../repositories/UserRepository";
import { parseId } from "../utils/parseId";

const expenseRepository = new ExpenseRepository();
const userRepository = new UserRepository();

export class ExpenseController {
    async findAll(req: Request, res: Response) {
        try {
            const expense = await expenseRepository.findAll();

            return res.status(200).json(expense);
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar despesas",
            });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = parseId(req.params.id);
            if (id === null) {
                return res.status(400).json({ message: "ID inválido", });
            }

            const expense = await expenseRepository.findById(id);
            if (!expense) {
                return res.status(404).json({ message: "Despesa não encontrada", });
            }

            return res.status(200).json(expense);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar despesa",
            });
        }
    }

    async findByUserId(req: Request, res: Response){
        try {
            const userId = parseId(req.params.userId);
            if (userId === null) {
                return res.status(400).json({ message: "ID de usuário inválido", });
            }

            const expenses = await expenseRepository.findByUserId(userId);

            return res.status(200).json(expenses);

        } catch (error) {
           return res.status(500).json({
                message: "Erro ao buscar despesas do usuário",
            });  
        }
    }


    async create(req: Request, res: Response) {
        try {
            const { description, amount, userId } = req.body;

            if (!description || amount === undefined || amount === null || userId === undefined || userId === null) {
                return res.status(400).json({ message: "Descrição, Valor e usuário são obrigatórios", });
            }

            const amountNumber = Number(amount);
            if (!Number.isFinite(amountNumber)) {
                return res.status(400).json({ message: "Valor inválido", });
            }

            const parsedUserId = parseId(userId);
            if (parsedUserId === null) {
                return res.status(400).json({ message: "ID de usuário inválido", });
            }

            const existingUser = await userRepository.findById(parsedUserId);

            if (!existingUser) {
                return res.status(404).json({ message: "Usuário não cadastrado no sistema", });
            }

            const expense = await expenseRepository.create(
                description,
                amountNumber.toFixed(2),
                parsedUserId
            );

            return res.status(201).json(expense);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao cadastrar a despesa",
            });
        }
    }
}
