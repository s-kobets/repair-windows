exports.handler = async function (event) {
  const { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } = process.env
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: event?.body,
      }),
    })

    return {
      statusCode: 200,
      body: "success",
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error,
      }),
    }
  }
}
