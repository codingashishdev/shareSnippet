import { getClient } from "./db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));


app.post("/save-snippet", async (req, res) => {
  try {
    const client = await getClient();
    if (!client) {
      throw new Error({ message: "Something went wrong while connecting to database" },
        { status: 400 })
    }
    const { name, snippet, description } = req.body;

    if (!name || !snippet || !description) {
      throw new Error({
        status: 400,
        message: "Name, snippet and description are required"
      })
    }

    await client.query(
      "INSERT INTO snippets (name, snippet, description) VALUES ($1, $2, $3)",
      [name, snippet, description]
    );

    res.json({ status: 200, message: "Snippet saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/snippet-list", async (req, res) => {
  try {
    const client = await getClient();

    const all_snippets = await client.query(
      "SELECT name,snippet,description FROM snippets"
    )

    res
      .status(200)
      .json({
        status: 200,
        data: all_snippets,
        message: "snippets fetched successfully"
      })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.listen(process.env.PORT, (e) => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
