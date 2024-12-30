module.exports = (req, res, next) => {
    const { email, password, first_name, last_name, top_up_amount } = req.body;
  
  
    if (req.path === "/register") {
      if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({
          status: 103,
          message: "Field Must Be Filled"
        });
      }
    }
  
    if (req.path === "/login") {
      if (!email || !password) {
        return res.status(400).json({
          status: 103,
          message: "Field Must Be Filled"
        });
      }
    }

    if (req.path === "/topup") {
        if (!top_up_amount) {
          return res.status(400).json({
            status: 103,
            message: "Field Must Be Filled"
          });
        }

        if (top_up_amount <= 0 || Number.isNaN(top_up_amount)) {
            return res.status(400).json({
              status: 102,
              message: "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0"
            });
          }
      }


    next();
  };