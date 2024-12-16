module.exports = {
  apps: [
    {
      name: "",
      script: "npm",
      watch: true,
      args: "run start",
      env_development: {
        PORT: 3001,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 8002,
        NODE_ENV: "production",
      },
    },
  ],
};
