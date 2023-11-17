import('dotenv').then((dotenv) => {
    dotenv.config();
});

import nodemailer from 'nodemailer';

export function enviarCorreo(destinatario, mensaje, delay) {
    setTimeout(() => {
        var transporter = nodemailer.createTransport({
            service: 'Outlook365',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.EMAIL,
            to: destinatario,
            subject: 'Mensaje MQTT',
            text: mensaje
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Correo enviado: ' + info.response);
            }
        });
    }, delay);
}
