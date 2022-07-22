const express = require('express');
const routes = require('./routes');

const AppError = require('./utils/AppError');

const migrationsRun = require('./database/sqlite/migrations');

migrationsRun();

const app = express();

app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
