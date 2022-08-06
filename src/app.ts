import * as express from "express";
import { Cat, CatType } from "./app.models";

const app: express.Express = express();

// * logging meddleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is middlware");
  next();
});

// * json middleware
app.use(express.json());

// * READ 고양이 전체 데이터 다 조회
app.get("/cats", (req, res) => {
  try {
    const cats = Cat;
    //throw new Error("에러발생!!");
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.massage,
    });
  }
});

// * READ 특정 고양이 데이터 조회
app.get("/cat/:id", (req, res) => {
  try {
    //throw new Error("에러발생!!!");
    const { id } = req.params;
    console.log("파라미터id확인", id);
    const cat = Cat.find((cats) => {
      return cats.id === id;
    });
    res.send({ success: true, data: cat });
  } catch (error: any) {
    res.send({ success: false, error: error.message });
  }
});

// * CREAT 새로운 고양이 추가 api
app.post("/cat", (req, res) => {
  try {
    const data = req.body;
    console.log("Data", data);
    Cat.push(data); //creat
    res.send({ success: true, data: { data } });
  } catch (error: any) {
    res.send({ success: false, error: error.message });
  }
});

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
