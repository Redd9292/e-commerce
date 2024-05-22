const stripe = require("stripe")("your-secret-key-from-stripe");

exports.handler = async (event) => {
  const { items } = JSON.parse(event.body);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${process.env.URL}/success`,
    cancel_url: `${process.env.URL}/cancel`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ id: session.id }),
  };
};
