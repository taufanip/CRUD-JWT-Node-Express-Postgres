class Util {
    constructor() {
      this.statusCode = null;
      this.type = null;
      this.data = null;
      this.message = null;
    }
  
    static setSuccess(statusCode, message, data) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.type = 'Success';
    }
  
    static setError(statusCode, message) {
      this.statusCode = statusCode;
      this.message = message;
      this.type = 'Error';
    }
    
    static send(res) {
      const result = {
        status: this.statusCode,
        message: this.message,
        data: this.data
      };
      if (this.type === 'Success') {
        return res.status(this.statusCode).json(result);
      }
      return res.status(this.statusCode).json({
        status: this.statusCode,
        message: this.message
      });
    }
  }

  module.exports = Util;