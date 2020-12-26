const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());

app.use(express.static('front/public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'front', 'public', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});