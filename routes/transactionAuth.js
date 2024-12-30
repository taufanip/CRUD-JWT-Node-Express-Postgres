const router = require("express").Router();
const authorization = require("../middleware/authorization");
const transactionController = require("../controller/transactionController");

router.get("/balance", authorization, transactionController.getBalance);
router.post("/transaction", authorization, transactionController.transactionUser);
router.get("/transaction/history", authorization, transactionController.getHistoryTransaction);
router.post("/topup", authorization, transactionController.topUp);


module.exports = router;