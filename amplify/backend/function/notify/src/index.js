const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return {
    statusCode: 401
  }

  try {
    await sgMail.send(msg)
    return {
      statusCode: 200,
      body: 'Succeed'
    }
  } catch (error) {
    console.error(error)

    if (error.response) {
      console.log(error.response.body)
      return {
        statusCode: 500,
        body: error.response.body
      }
    }

    return {
      statusCode: 500,
      body: 'Failed'
    }
  }
}

const msg = (to, data) => ({
  to,
  from: 'no-reply@survaq.com',
  templateId: 'd-812677117fa7414ea9cb219d8dc0ab45',
  dynamicTemplateData: data
})