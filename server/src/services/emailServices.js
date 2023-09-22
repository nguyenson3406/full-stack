require('dotenv').config();
import nodemailer from 'nodemailer'

let sendSimpleEmail = async (data) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: '"TestBooking" <testbooking@example.com>',
        to: data.email,
        subject: "Thông tin đặt lịch khám bệnh",
        html: `
        <h3>Xin chào ${data.firstName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên TestBooking.</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${data.timeData}</b></div>
        <div><b>Bác sĩ: ${data.doctorName}</b></div>

        <p>Nếu các thông tin trên là chính xác, vui lòng click vào đường link bên dưới
            để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh. 
        </p>
        <div>
        <a href=${data.redirectLink} target="_blank" >Click here</a>
        </div>

        <div> Xin chân thành cảm ơn</div>
        `,
    });
}

let sendRemedyEmail = async (data) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: '"TestBooking" <testbooking@example.com>',
        to: data.email,
        subject: "Kết quả đặt lịch khám bệnh",
        html: `
        <h3>Xin chào ${data.firstName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên TestBooking.</p>
        <p>Thông tin đơn thuốc/hoá đơn được gửi trong file đính kèm.</p>

        <div> Xin chân thành cảm ơn</div>
        `,
        attachments: [
            {
                filename: `remedy-${new Date().getTime()}.jpg`,
                content: data.file.split("base64,")[1],
                encoding: 'base64'
            }
        ],
    });
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendRemedyEmail: sendRemedyEmail,
}