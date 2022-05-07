const express = require('express');
const app = express();
const PORT = 3000;

//app.get
app.get('/api', (req,res) => {
  console.log("api working")
})
//app.post

//app.delete & app.patch for stretch

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
