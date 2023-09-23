import { prisma } from "../../../../support/prisma";

export default async function handler(req, res) {
  try {
    const id = req.query.id;
    if (req.method === "GET") {
      const data = await prisma.recipe.findUnique({
        where: {
          id,
        },
      });

      return res.status(200).json({ ...data, id: data.id.toString() });
    } else if (req.method === "DELETE") {
      const deletedRecipe = await prisma.recipe.delete({
        where: {
          id,
        },
      });
      if (deletedRecipe) {
        return res.status(200).json({ message: "Recipe deleted!" });
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
