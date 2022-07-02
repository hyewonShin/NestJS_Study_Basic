import * as express from "express";

const app: express.Express = express();
const port: number = 3000;

app.get("/", (req, res) => {
  res.send({ hello: "dd" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
