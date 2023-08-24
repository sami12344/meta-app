import express from 'express'
import axios from 'axios'
import schedule from 'node-schedule'

const app = express()
const port = process.env.PORT || 3000

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
app.get('/',(req,res)=>{
  res.send('Meta app with express ts')
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
