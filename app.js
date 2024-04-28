import { Hono } from "https://deno.land/x/hono/mod.ts";

const app = new Hono();

// Utility to get feedback count
async function getFeedback(feedbackType) {
  const key = `feedback_${feedbackType}`;
  const count = await Deno.env.get(key); // Placeholder for Deno KV get operation
  return count || 0;
}

// Utility to increment feedback count
async function incrementFeedback(feedbackType) {
  const key = `feedback_${feedbackType}`;
  let count = await Deno.env.get(key) || 0; // Placeholder for Deno KV get operation
  count++;
  await Deno.env.set(key, String(count)); // Placeholder for Deno KV set operation
}

// Define GET and POST routes for feedbacks 1, 2, and 3
[1, 2, 3].forEach(num => {
  app.get(`/feedbacks/${num}`, async (c) => {
    const count = await getFeedback(num);
    return c.text(`Feedback ${num}: ${count}`);
  });

  app.post(`/feedbacks/${num}`, async (c) => {
    await incrementFeedback(num);
    const count = await getFeedback(num);
    return c.text(`Feedback ${num}: ${count}`);
  });
});

export default app;

