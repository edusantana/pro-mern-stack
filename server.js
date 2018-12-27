const express = require('express');
const app = express();
app.use(express.static('static'));

app.listen(3000, function(){
  console.log("Aplicativo iniciado na porta 3000");
});
