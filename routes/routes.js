import express from "express";
import DataController from "../src/controllers/dataController";
import HaapiController from "../src/controllers/haapiController";

const router = express.Router();

router.post("/data/dictionary", DataController.getDictionary);
router.post("/data/map", DataController.getDataMap);
router.post("/haapi/Api/CreateApiKey", HaapiController.createApiKey);
router.get("/haapi/Account/CreateToken", HaapiController.createToken);

export default router;