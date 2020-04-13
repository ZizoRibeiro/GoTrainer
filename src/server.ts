import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Server is UP and Running!" });
});

app.listen(3333, () => {
  console.log("Server is working on port 3333.");
});
