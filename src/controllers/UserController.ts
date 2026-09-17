import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/UserRepository";
import { parseId } from "../utils/parseId";

const userRepository = new UserRepository();

export class UserController {
    async findAll(req: Request, res: Response) {
        try {
            const users = await userRepository.findAll();

            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar usuários",
            });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = parseId(req.params.id);
            if (id === null) {
                return res.status(400).json({ message: "ID inválido", });
            }

            const user = await userRepository.findById(id);
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado", });
            }

            return res.status(200).json(user);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar usuário",
            });
        }
    }


    async create(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: "nome, email e senha são obrigatórios", });
            }

            const existingUser = await userRepository.findByemail(email);

            if (existingUser) {
                return res.status(409).json({ message: "E-mail já cadastrado", });
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const user = await userRepository.create(name, email, passwordHash);

            return res.status(201).json(user);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao cadastrar o usuário",
            });
        }
    }
}
