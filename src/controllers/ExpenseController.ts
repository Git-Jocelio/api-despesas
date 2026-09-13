import { Request, Response } from "express";
import { ExpenseRepository } from "../repositories/ExpenseRepository";

const expenseRepository = new ExpenseRepository();

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
            const id = Number(req.params.id);

            const expense = await expenseRepository.findByById(id);
            if (!expense) {
                return res.status(404).json({ message: "Despesa não encontrado", });
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
            const userId = Number(req.body.userId);

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

            if (!description || !amount || !userId) {
                return res.status(400).json({ message: "Descrição, Valor e usuário são obrigatórios", });
            }

            const existingUser = await expenseRepository.findByUserId(userId);

            if (!existingUser) {
                return res.status(409).json({ message: "Usuário não cadastrado no sistema", });
            }

            const expense = await expenseRepository.create(description, amount, Number(userId));

            return res.status(201).json(expense);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao cadastrar a despesa",
            });
        }
    }
}//fim da classe