const pool = require("../config/db")
const util = require("../utils/util")


exports.getListBanner = async(req,res) => {
    try {
        const getListBanner =  await pool.query("SELECT banner_name, banner_image, description FROM banners");
        const dataBanner = getListBanner.rows;
        if (getListBanner.rows.length > 0) {
          util.setSuccess(200, 'Success', dataBanner);
        } else {
          util.setSuccess(200, 'Data Not Found');
        }
        return util.send(res);
      } catch (error) {
        util.setError(400, error);
        return util.send(res);
      }
    
}

exports.getListServices = async(req,res) => {
    try {
        const getListServices =  await pool.query("SELECT service_code, service_name, service_icon, service_fee FROM services");
        const dataServices = getListServices.rows;
        if (getListServices.rows.length > 0) {
            console.log(util.setSuccess)
          util.setSuccess(200, 'Success', dataServices);
        } else {
          util.setSuccess(200, 'Data Not Found');
        }
        return util.send(res);
      } catch (error) {
        util.setError(400, error);
        return util.send(res);
      }
    
}
