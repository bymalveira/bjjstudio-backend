import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { router as sessionsRoutes } from "./sessions/sessions.routes";
import { router as partnersRouter } from "./partners/partners.routes";
import { router as sparringRouter } from "./sparring/sparring.route";
import { router as drillsRouter } from "./drills/drills.route";
import { router as spacificRouter } from "./specific-training/specific-training.route";

const app = express();

app.use(morgan("tiny"));

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use("/api", sessionsRoutes);
app.use("/api", partnersRouter);
app.use("/api", sparringRouter);
app.use("/api", drillsRouter);
app.use("/api", spacificRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(error.message);
});

export default app;
