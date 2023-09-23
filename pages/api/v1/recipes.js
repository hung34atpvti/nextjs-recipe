import { prisma } from "../../../support/prisma";

export default function handler(req, res) {
  if (req.method === "GET") {
    prisma.recipe.findMany().then((data) => {
      console.log("data", data);
      res.status(200).json(data.map((el) => ({ ...el, id: el.id.toString() })));
    });
  }
}
