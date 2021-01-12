const sgMail = require('@sendgrid/mail')
const AWS = require('aws-sdk')

const headers = {
  "Content-Type": 'application/json',
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
  "Access-Control-Allow-Origin": "*"
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return {
    statusCode: 401
  }

  try {
    const SecretId = `chachat/${process.env.ENV}/SENDGRID_API_KEY`
    const secretsManager = new AWS.SecretsManager()
    const secret = await secretsManager.getSecretValue({ SecretId }).promise()
    sgMail.setApiKey(JSON.parse(secret.SecretString)[SecretId])

    const { values, config } = JSON.parse(event.body)
    const data = {
      session_title: config.title,
      details: Object.entries(values).map(([key, value]) => ({ key, value }))
    }
    await sgMail.send(msg(config.email, data))
    return {
      statusCode: 200,
      body: JSON.stringify('Succeed'),
      headers
    }
  } catch (error) {
    console.error(error)

    if (error.response) {
      console.log(error.response.body)
      return {
        statusCode: 500,
        body: JSON.stringify(error.response.body),
        headers
      }
    }

    return {
      statusCode: 500,
      body: JSON.stringify('Failed'),
      headers
    }
  }
}

const msg = (to, data) => ({
  to,
  from: 'no-reply@survaq.com',
  templateId: 'd-812677117fa7414ea9cb219d8dc0ab45',
  dynamicTemplateData: data
})