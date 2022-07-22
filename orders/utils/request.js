const axios = require('axios');

const Request = axios.create();

Request.interceptors.request.use((config) => {
  const configWithJWT = Object.assign(config, { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuYXJhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoibmFyYSIsImlhdCI6MTY1ODUwODAxMH0.EgGBPK0gAl_wyGgR-68intG3r9KM6vid8-YKaQ5EfW0' } });
  return configWithJWT;
});

module.exports = Request;
