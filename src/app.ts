import * as express from "express";
import catsRouter from "./cats/cats.route";

const app: express.Express = express();

// * logging meddleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is middlware");
  next();
});

// * json middleware
app.use(express.json());

// cats 라우터 등록
app.use(catsRouter);

// * 404 middleware
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404에러입니다." });
});

app.listen(7000, () => {
  console.log("server is on...");
});

// app.use : 모든 api에 미들웨어로 사용 가능
// app.get : 특정 api에 미들웨어로 사용 가능
