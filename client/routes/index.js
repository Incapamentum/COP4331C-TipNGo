const express = require('express');

const router = express();

router.get('', (req, res) =>
{
    res.send('This is a simple GET request test');
});

// module.exports = () =>
// {
//     // Including different GET, POST, etc, HTTP requests (req, res, next)
// }