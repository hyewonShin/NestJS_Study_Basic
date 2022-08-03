import * as express from "express";
import { Cat, CatType } from "./app.models";

const app: express.Express = express();

app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is middlware");
  next();
});

app.get("/cats/som", (req, res, next) => {
  console.log("이것은 som 미들웨어이다!");
  next();
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send({ cats: Cat });
});

app.get("/cats/blue", (req, res, next: express.NextFunction) => {
  res.send({ blue: Cat[0] });
});

app.get("/cats/som", (req, res) => {
  res.send({ som: Cat[1] });
});

app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404에러입니다." });
});

app.listen(8000, () => {
  console.log("server is on...");
});

// app.use : 모든 api에 미들웨어로 사용 가능
// app.get : 특정 api에 미들웨어로 사용 가능
