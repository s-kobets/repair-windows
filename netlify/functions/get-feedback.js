exports.handler = async function () {
  const { AIRTABLE_BASE_ID, AIRTABLE_TOKEN } = process.env
  try {
    const data = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Table 1`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        },
      }
    ).then(res => res.json())

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error,
    }
  }
}
