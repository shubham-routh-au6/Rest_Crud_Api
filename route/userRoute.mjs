import express from "express";
import controller from "../controller/userCon.mjs";

const route = express();

route.post("/createUser", controller.createUser);
route.get("/allUser", controller.allUsers);
route.put("/updateUser/:id", controller.updateUser);
route.delete("/deleteUser/:id", controller.deleteUser);
route.get("/sortBycreatedAt", controller.UserSortedByCreatedAt);
route.get("/sortByCoordinate", controller.sortByCoordinate);

export default route;
