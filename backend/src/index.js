import express from "express";
import cors from "cors";
import demandasRoutes from "./routes/demandas.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

app.use("/demandas", demandasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
