const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get('/api/news', async (req, res) => {
  try {
    const { country, category, pageSize, currentPage } = req.query; // Remove the space between currentPage and the closing bracket
    const apiKey = '8a4289f64cd343628e5f59a90c6a4263';

    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${currentPage}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching news.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
