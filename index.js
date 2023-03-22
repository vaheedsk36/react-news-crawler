const request = require('request');
const cheerio = require('cheerio');
const XLSX = require('xlsx');

const url = 'https://medium.com/tag/reactjs/latest';

request(url, (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html);
    const newsList = [];

    $('.news-item').each((i, el) => {
      const title = $(el).find('.title').text().trim();
      const summary = $(el).find('.summary').text().trim();
      const date = $(el).find('.date').text().trim();

      newsList.push({
        title,
        summary,
        date
      });
    });

    // Save the news to Excel file
    const worksheet = XLSX.utils.json_to_sheet(newsList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ReactJS News');
    XLSX.writeFile(workbook, 'reactjs-news.xlsx');
  }
});
