const Razorpay = require("razorpay");

// console.log();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const checkOut = async (req, res) => {
  const {amount} = req.body;
  try {
    // console.log(instance);
    const options = {
      amount: amount*100, // amount in smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Order not placed!");
  }
};

const paymentVerification = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId } = req.body;
    res.json({ razorpayOrderId, razorpayPaymentId });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Payment Verification failed!");
  }
};

module.exports = {
  checkOut,
  paymentVerification,
};
