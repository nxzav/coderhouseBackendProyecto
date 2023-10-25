import fs from "node:fs";
import { Router } from "express";

const router = Router();
const src = './src/data/carts.json';

function fileRead() {
  let data = fs.readFileSync(src, "utf8");
  return data;
}

router.get("/", async (req, res) => {
  const data = fileRead();
  res.send(JSON.parse(data));
});

router.get("/:cid", (req, res) => {
  const index = Number(req.params.cid);
  const data = JSON.parse(fileRead());
  const foundCart = data.find(e => e.id === index);
  if (!foundCart) {res.json('El id del Carrito no existe')}
  
  res.json(foundCart);
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