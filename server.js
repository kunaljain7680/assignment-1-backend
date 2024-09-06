const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const port = 3000; // You can use any available port

app.use(cors());
app.use(express.json());

// SQL Server configuration
const config = {
    user: 'maqadmin',
    password: '#1Password',
    server: 'sepbootcamp.database.windows.net',
    database: 'Sep2BootcampDB',
    options: {
        encrypt: true // Use if you are on Azure
    }
};

// Route to fetch top 20 rows from SalesLT.Customer
app.get('/api/customers', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT TOP 20 * FROM SalesLT.Customer');
        console.log(result)
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
