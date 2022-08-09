import * as express from "express";
import catsRouter from "./cats/cats.route";

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.use(catsRouter);
  }

  private setMiddleware() {
    // * logging meddleware
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log("this is middlware");
      next();
    });

    // * json middleware
    this.app.use(express.json());

    this.setRoute();

    // * 404 middleware
    this.app.use((req, res, next) => {
      console.log("this is error middleware");
      res.send({ error: "404에러입니다." });
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(7000, () => {
      console.log("server is on...");
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();

// app.use : 모든 api에 미들웨어로 사용 가능
// app.get : 특정 api에 미들웨어로 사용 가능
