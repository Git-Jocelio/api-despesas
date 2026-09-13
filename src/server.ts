import express from "express";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";

const app = express();

app.use(express.json());

app.use("/user", userRoutes);
app.use("/expenses", expenseRoutes);

app.get("/",(req, res) => {
    res.json({
            message: "API de despesas funcionando!"
        });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    
});