import express from 'express'
import axios from 'axios'
import schedule from 'node-schedule'
import ngrok from 'ngrok'

const app = express()
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

// Replace with your actual credentials
const accessToken = 'YOUR_USER_ACCESS_TOKEN'
const targetUserId = 'TARGET_USER_ID'
const message = 'Happy Birthday! 🎉🎂'

async function sendBirthdayMessage() {
  try {
    const url = `https://graph.instagram.com/${targetUserId}/media`
    const params = {
      access_token: accessToken,
      message: message,
    }

    const response = await axios.post(url, null, { params })

    if (response.status === 200) {
      console.log('Birthday message sent successfully!')
    } else {
      console.log('Failed to send birthday message.')
    }
  } catch (error) {
    console.error('Error sending birthday message:', (error as Error).message)
  }
}

// Schedule the message on August 25th at 00:00
schedule.scheduleJob('0 0 * 8 25', sendBirthdayMessage)

// Expose local server to a public URL using ngrok
;(async () => {
  const ngrokUrl = await ngrok.connect(port)
  console.log(`Server is running at: ${ngrokUrl}`)
})()

app.listen(port, () => {
  console.log(`Local server is running on port ${port}`)
})
