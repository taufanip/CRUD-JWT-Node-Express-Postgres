const pool = require("../config/db");
const util = require("../utils/util");

exports.getBalance = async (req, res) => {
    try {
        const email = req.user;
        const getBalance = await pool.query(`SELECT balance FROM users WHERE email=$1`, [email]);
        const data = getBalance.rows[0];
        if (data) {
          util.setSuccess(200, "Success", data);
          return util.send(res);
        }
      } catch (error) {
        util.setError(400, error);
        return util.send(res);
    }
  };

exports.topUp = async (req, res) => {
    try {
        const email = req.user;
        const { top_up_amount } = req.body;

        const transType = "TOPUP";
        const desc = "Top Up Balance"
        const transDate = new Date().toISOString();
        const amount = parseInt(top_up_amount);

        if(Number.isNaN(amount) || amount <= 0){
          util.setError(400, "Parameter amount harus berupa angka dan lebih kecil dari 0");
          return util.send(res);
        }

        firstRandom = Math.floor(10000000 + Math.random() * 99999999);
        lastRandom = Math.floor(1000 + Math.random() * 9000);
        const invNumber = "INV"+firstRandom+"-"+lastRandom;

        const findBalance = await pool.query("SELECT balance FROM users WHERE email=$1", [email]);
        const balanceExisting = findBalance.rows[0];

        const updateBalance = parseInt(balanceExisting.balance+top_up_amount);

        const updateData = await pool.query(`UPDATE users SET balance = $1 WHERE email = $2
            RETURNING balance`, [updateBalance, email]);
            const dataUpdated = updateData.rows[0];

            
            await pool.query("INSERT INTO transaction_history (email, invoice_number, transaction_type, description, total_amount, created_on) VALUES ($1, $2, $3, $4, $5, $6)",
            [email, invNumber, transType, desc, amount, transDate ]);
        
            util.setSuccess(200, 'Top Up Balance Berhasil', dataUpdated);
            return util.send(res);
        
      } catch (error) {
        util.setError(400, error);
        return util.send(res);
      }
  };

exports.getHistoryTransaction = async (req, res) => {
    try {
        const email = req.user;
        const offset = req.query.offset;
        const limit = req.query.limit;

        const getHistory = await pool.query(`SELECT invoice_number, transaction_type, description, total_amount, created_on FROM transaction_history WHERE email=$1 
            ORDER BY created_on DESC OFFSET 0 LIMIT 3`, [email]);
        const data = getHistory.rows;
        let responseData = {
          offset: offset,
          limit: limit,
          records: data
        }
        if (responseData) {
          util.setSuccess(200, "Success", responseData);
          return util.send(res);
        }
      } catch (error) {
        util.setError(400, error);
        return util.send(res);
    }
  };

  exports.transactionUser = async (req, res) => {
    try {
        const email = req.user;
        const { service_code } = req.body;

        const transType = "PAYMENT";

        const findService = await pool.query("SELECT * FROM services WHERE service_code=$1", [
          service_code
        ]);
        if(findService.rows.length === 0){
          util.setError(404, "Service ataus Layanan tidak ditemukan");
          return util.send(res);
        }

        let dataService = findService.rows[0];
        const serviceName = dataService.service_name;
        const totalAmount = dataService.service_fee;
        const transDate = new Date().toISOString();


        firstRandom = Math.floor(10000000 + Math.random() * 99999999);
        lastRandom = Math.floor(1000 + Math.random() * 9000);
        const invNumber = "INV"+firstRandom+"-"+lastRandom;

        const findBalance = await pool.query("SELECT balance FROM users WHERE email=$1", [email]);
        const balanceExisting = findBalance.rows[0];

        const updateBalance = parseInt(balanceExisting.balance-totalAmount);
            await pool.query(`UPDATE users SET balance = $1 WHERE email = $2
            RETURNING balance`, [updateBalance, email]);

            await pool.query(`INSERT INTO transaction_history (email, invoice_number, transaction_type, description, total_amount, created_on) 
              VALUES ($1, $2, $3, $4, $5, $6)`,
            [email, invNumber, transType, serviceName, totalAmount, transDate ]);
           
            const dataTransaction = 
              await pool.query(`INSERT INTO transaction(invoice_number, service_code, service_name, transaction_type, total_amount, created_on)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING invoice_number, service_code, service_name, transaction_type, total_amount, created_on`,
                [invNumber, service_code, serviceName, transType, totalAmount, transDate ]);
            
            const responseData = dataTransaction.rows[0];

            util.setSuccess(200, 'TRANSAKSI BERHASIL', responseData);
            return util.send(res);
        
      } catch (error) {
        util.setError(400, error);
        return util.send(res);
      }
  };