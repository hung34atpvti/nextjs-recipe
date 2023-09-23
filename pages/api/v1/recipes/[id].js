import { prisma } from "../../../../support/prisma";

export default function handler(req, res) {
  if (req.method === "GET") {
    prisma.recipe
      .findUnique({
        where: {
          id: req.query.id,
        },
      })
      .then((data) => {
        console.log("data1", data);
        res.status(200).json({ ...data, id: data.id.toString() });
      });
  }
}
