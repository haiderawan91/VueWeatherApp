module.exports = {
  apps: [
    {
      name: "weather-backend",
      script: "./src/index.js",
      cwd: "./backend",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 5000
      }
    }
  ]
}
