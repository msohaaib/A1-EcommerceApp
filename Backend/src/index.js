import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`App listening on http://10.0.2.2:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting", err);
    process.exit(1);
  });
