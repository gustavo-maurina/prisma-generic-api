import dotenv from "dotenv";
import serverSetup from "./serverSetup";

dotenv.config();
const server = serverSetup();

export default server;
