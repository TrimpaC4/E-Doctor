const axios = require("axios");

module.exports = {
  Add: async (req, res) => {
    const Url = "https://developers.flouci.com/api/generate_payment";
    const payload = {
      app_token: "0dfbe6c6-c373-41af-a3cc-dcc45b3f4741",
      app_secret: process.env.FLOUCI_SECRET,
      amount: req.body.amount,
      accept_card: "true",
      session_timeout_secs: 100000,
      success_link: "http://localhost:3000/",
      fail_link: "http://localhost:3000/fail",
      developer_tracking_id: "d6b93e60-4302-4f61-ace7-cdb67559ae49",
    };
    try {
      const response = await axios.post(Url, payload);
      res.send(response.data);
    } catch (error) {
      throw error;
    }
  },

  verifyPayment: async (req, res) => {
    const payment_ID = req.params.id;
    const verificationURL = `https://developers.flouci.com/api/verify_payment/${payment_ID}`;
    try {
      const verfResult = await axios.get(verificationURL, {
        headers: {
          "Content-Type": "application/json",
          apppublic: "0dfbe6c6-c373-41af-a3cc-dcc45b3f4741",
          appsecret: process.env.FLOUCI_SECRET,
        },
      });
      res.send(verfResult.data);
    } catch (error) {
      throw error;
    }
  },
};
