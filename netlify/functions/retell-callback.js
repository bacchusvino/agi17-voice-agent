exports.handler = async (event) => {
  console.log("Webhook received:", event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Callback OK" }),
  };
};

