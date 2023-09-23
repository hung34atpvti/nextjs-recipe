import { prisma } from "../../../support/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const data = await prisma.recipe.findMany();

      return res
        .status(200)
        .json(data.map((el) => ({ ...el, id: el.id.toString() })));
    } else if (req.method === "POST") {
      const data = await prisma.recipe.create({
        data: req.body,
      });
      if (data) {
        return res.status(200).json({ ...data, id: data.id.toString() });
      } else {
        return res.status(400).json({ message: "Bad Request" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Bad Request", error: "Method is not supported" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: JSON.stringify(error) });
  }
}
