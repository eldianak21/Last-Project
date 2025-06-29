require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const sendOTP = async (toPhoneNumber, otp) => {
    try {
        if (!accountSid || !authToken || !twilioPhoneNumber) {
            console.warn('Twilio credentials or phone number not configured.');
            return { success: false, error: 'Twilio configuration missing' };
        }

        const message = await client.messages.create({
            body: `Your OTP for password reset is: ${otp}`,
            to: toPhoneNumber,
            from: twilioPhoneNumber,
        });

        console.log('SMS sent successfully:', message.sid);
        return { success: true, sid: message.sid };

    } catch (error) {
        console.error('Error sending SMS:', error);
        return { success: false, error: error.message };
    }
};

module.exports = { sendOTP };