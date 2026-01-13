require("dotenv").config();
const { handler } = require("./netlify/functions/contact");

const event = {
  body: JSON.stringify({
    name: "Daniel",
    email: "daptcas@gmail.com",
    message: "Mensaje enviado desde local (test.js)"
  })
};

handler(event).then(res => {
  console.log("Respuesta:", res);
});
