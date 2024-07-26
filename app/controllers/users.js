const db = require("../../database")


module.exports = class userController {
    static async getAll(req, res, next) {
        try {
          //get data qury params for paginations, query params ?
          const { page = 1, limit = 25, search = "", order = "asc" } = req.query;
    
          const user = await db("users")
            .limit(+limit)
            .offset(+limit * +page - +limit)
            .orderBy("created_at", order)
            .where("name", "like", `%${search}%`);
          return res.json({
            success: true,
            message: "users successfully retrieved",
            user,
          });
        } catch (error) {
          next(error);
        }
      }
}