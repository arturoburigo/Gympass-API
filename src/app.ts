import express, { Router } from "express";
import { appRoutes } from "./routes";

export const app = express();

const router = Router(); 
app.use(express.json());
app.use(router); 

appRoutes(router); 


