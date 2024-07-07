import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import Stripe from "stripe";

const app = new Hono();

const api = app.basePath("/api");

api.use("*", clerkMiddleware());

api.get("/hello", (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "You are not logged in.",
    });
  }

  return c.json({
    message: "You are logged in!",
    userId: auth.userId,
  });
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

api.post("/create-payment-intent", async (c) => {
  // const { items } = c.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return c.json(
    {
      clientSecret: paymentIntent.client_secret,
    },
    201
  );
});

export default app;
