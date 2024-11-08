import dotenv from 'dotenv';
dotenv.config();

import ui from "./UI";
import { Server } from 'http';

const PORT = process.env.PORT || 3000;

const httpServer: Server = ui.listen(PORT, () => console.log("Buckfish Homepage started on Port: " + PORT + "!"));
