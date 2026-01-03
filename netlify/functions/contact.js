const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const { name, email, message } = data;

    await resend.emails.send({
      from: "MIA Soluciones <contacto@miatech.cloud>",
      to: ["TU_CORREO@tudominio.com"],
      subject: "Nuevo contacto desde el sitio web",
      html: `
        <h2>Nuevo mensaje recibido</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "¡Recibimos tu mensaje! Te contactaremos pronto."
      })
    };

  } catch (error) {
    console.error("Error enviando email:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Error enviando el mensaje. Intenta más tarde."
      })
    };
  }
};
