import app from "./app";
import appconfigs from "./configs";
import Dbconnect from "./database";

async function main() {
  // Database connection
  await Dbconnect(appconfigs.mongoURI!);

  app.get("/", (_, res) => {
    res.status(200).json({
      status: "success",
    });
  });

  app.listen(appconfigs.Port, () => {
    console.log(`Server started at http://localhost:${appconfigs.Port}/`);
  });
}

main();
