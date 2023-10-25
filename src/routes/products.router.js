import fs from "node:fs";
import { Router } from "express";

const router = Router();
const src = './src/data/products.json';

function fileRead() {
  let data = fs.readFileSync(src, "utf8");
  return data;
}

router.get("/", async (req, res) => {
  const data = fileRead();
  res.send(JSON.parse(data));
});

router.get("/:pid", (req, res) => {
  const index = Number(req.params.pid);
  const data = JSON.parse(fileRead());
  const foundProduct = data.find(e => e.id === index);
  if (!foundProduct) {res.json('El id del producto no existe')}
  
  res.json(foundProduct);
});

router.post("/", (req, res) => {
  res.json("Posted cart");
});

router.put("/", (req, res) => {
  res.json("Updated cart");
});

router.delete("/", (req, res) => {
  res.json("Deleted cart");
});

export default router;