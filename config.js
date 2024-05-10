import {config} from 'dotenv'

config();



export default {
PORT: process.env.PORT || 4000,
 DB_USER: process.env.DB_USER || "antonella_123", //Aqui pone tu user
 DB_PASSWORD:process.env.DB_PASSWORD || "antonella-123", //Aqui la contra del use de sql
 DB_SERVER : process.env.DB_SERVER || "DESKTOP-CMCBH8F",
 DB_DATABASE : process.env.DB_DATABASE || "LAS_PISTAS_DE_ANNI"

};
