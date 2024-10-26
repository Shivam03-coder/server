import { config } from "dotenv";
config();

const appconfigs = {
  Port: process.env.PORT,
  mongoURI: process.env.DATABASE_URL,
  AcesstokenKey: process.env.ACESS_TOKEN_SECRET_KEY,
  RefreshtokenKey: process.env.REFRESH_TOKEN_SECRET_KEY,
  Nextapp: process.env.NEXT_APP_BASE_URL,
};

export default appconfigs;
