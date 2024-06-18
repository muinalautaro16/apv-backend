import nodemailer from 'nodemailer';
 
const emailOlvidePassword = async (datos) => {
    const {email, nombre, token} = datos;
 
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });   
 
    // Enviar email
    const info = await transport.sendMail({
        from: '"APV - Administrador Pacientes Veterinaria" <apv@correo.com>', // sender address
        to: email, // list of receivers
        subject: "Reestablece tu password", // Subject line
        text: "Reestablece tu password", // plain text body
        html: ` <p> Hola <strong>${nombre}</strong> <br /> has solicitado reestablecer tu password</p>
        <p>Hace falta solo un paso para confirmar tu cuenta, haz click en el siguiente enlace: 
        <a href='${process.env.FRONTEND_URL}/olvide-password/${token}'>Reestablecer password</a>
        </p>
        
        <p>Si no creaste esta cuenta puedes eliminar este mensaje</p>
 
        `, // html body
      });
 
    console.log('Mensaje enviado: %s', info.messageId);
};
 
export default emailOlvidePassword;