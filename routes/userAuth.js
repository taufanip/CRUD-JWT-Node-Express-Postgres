const router = require("express").Router();
const validateInfo = require("../middleware/validateInfo");
const authorization = require("../middleware/authorization");
const userController = require("../controller/userController");
// const upload = require("../middleware/upload");


router.post("/register", validateInfo, userController.userRegister);
router.post("/login", validateInfo, userController.userLogin);
router.get("/profile", authorization, userController.getProfile);
router.put("/profile/update", authorization, userController.updateProfile);
// router.put("/profile/image", upload.single("file"), userController.updateProfileImage);


module.exports = router;