exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    console.log("Nuevo mensaje:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "¡Recibimos tu mensaje! Te contactaremos pronto."
      })
    };

  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Error procesando el formulario"
      })
    };
  }
};
