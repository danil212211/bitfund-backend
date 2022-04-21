const nodemailer = require ("nodemailer");
let account = {
    "user" : "verify.14bit.ru@gmail.com",
    "pass" : "Ep872UH8LZ8AxVD"
};
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: account.user,
        pass: account.pass,
    },
});
async function sendVerificationMessage (who,subject,text) {
    let info = await transporter.sendMail({
        from: 'edaedet team', // sender address
        to: who, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
    });
    return info;
}
module.exports= {
    sendVerificationMessage:sendVerificationMessage
};