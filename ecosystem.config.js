module.exports = {
  apps: [
    {
      name: "weather-backend",
      script: "./backend/src/index.js", // adjust if entry file is index.js/app.js
      cwd: "./backend",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 5000
      }
    },
    {
      name: "weather-frontend",
      script: "npx serve -s dist -l 3000", // using serve to host built frontend
      cwd: "./frontend",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}
