import { Cat, CatType } from "./cats.model";
import { Router } from "express";

const router = Router();

// * READ 고양이 전체 데이터 다 조회
router.get("/cats", (req, res) => {
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
router.get("/cat/:id", (req, res) => {
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
router.post("/cat", (req, res) => {
  try {
    const data = req.body;
    console.log("Data", data);
    Cat.push(data); //creat
    res.send({ success: true, data: { data } });
  } catch (error: any) {
    res.send({ success: false, error: error.message });
  }
});

// * UPDATE 고양이 데이터 업데이트 -> PUT
router.put("/cat/:id", (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === id) {
        cat = body;
        result = cat;
      }
    });
    res.status(200).send({ success: true, cat: result });
  } catch (error: any) {
    res.status(400).send({ success: false, error: error.message });
  }
});

// * UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
router.patch("/cat/:id", (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === id) {
        cat = { ...cat, ...body };
        result = cat;
      }
    });
    res.status(200).send({ success: true, cat: result });
  } catch (error: any) {
    res.status(400).send({ success: false, error: error.message });
  }
});

// * UPDATE 고양이 데이터 삭제 -> DELETE
router.delete("/cat/:id", (req, res) => {
  try {
    const { id } = req.params;
    const newCat = Cat.filter((cat) => cat.id !== id);
    res.status(200).send({ success: true, data: newCat });
  } catch (error: any) {
    res.status(400).send({ success: false, error: error.message });
  }
});

export default router;
