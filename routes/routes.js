const router = require('express').Router();
const Razorpay = require('razorpay');
router.post("/generate-order", async (req, res) => {

    const { token, userData } = req.body;

    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_PUBLIC_KEY,
            key_secret: process.env.RAZORPAY_SECRET_KEY
        });

        const options = {
            amount: (parseInt(token.live.subtotal.raw, 10))*100, // amount in smallest currency unit
            currency: "USD",
            notes: {
                name: `${userData.firstName} ${userData.lastName}`,
                email: userData.email
            }
        };

        const order = await instance.orders.create(options);
        if(order){
            res.send(order);
        }

    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
