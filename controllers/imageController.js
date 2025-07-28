const axios = require('axios');
const Search = require('../models/Search');

const PIXABAY_API = 'https://pixabay.com/api/';
const API_KEY = process.env.PIXABAY_API_KEY;

exports.searchImages = async (req, res) => {
  const { query } = req.params;
  const page = req.query.page || 1;

  await Search.create({ term: query });

  try {
    const response = await axios.get(PIXABAY_API, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        per_page: 10,
        page
      }
    });

    const results = response.data.hits.map(img => ({
      imageUrl: img.webformatURL,
      description: img.tags,
      pageUrl: img.pageURL
    }));

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching images' });
  }
};

exports.getRecentSearches = async (req, res) => {
  const recent = await Search.find({})
    .sort({ when: -1 })
    .limit(10)
    .select({ _id: 0, term: 1, when: 1 });

  res.json(recent);
};