import express from "express";
import demandasRoutes from "./routes/demandas.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/demandas", demandasRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
