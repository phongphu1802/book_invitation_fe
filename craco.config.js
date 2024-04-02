require("react-scripts/config/env");

const path = require("path");
const fs = require("fs");

const getHttpsOptions = () => {
  const envCertPath = process.env.APP_SSL_CERT;
  const envKeyPath = process.env.APP_SSL_KEY;

  if (!envCertPath || !envKeyPath) {
    return undefined;
  }

  const certPath = path.resolve(__dirname, process.env.APP_SSL_CERT);
  const keyPath = path.resolve(__dirname, process.env.APP_SSL_KEY);

  if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
    return undefined;
  }

  return {
    minVersion: "TLSv1.1",
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath),
  };
};

module.exports = {
  devServer: {
    port: process.env.APP_PORT || 3000,
    host: process.env.APP_HOST || "localhost",
    https: getHttpsOptions(),
  },
  webpack: {
    alias: {
      "@constants": path.resolve(__dirname, "src/app/Constants"),
      "@services": path.resolve(__dirname, "src/app/Services"),
      "@slices": path.resolve(__dirname, "src/app/Slices"),
      "@enums": path.resolve(__dirname, "src/app/Enums"),
      "@selectors": path.resolve(__dirname, "src/app/Selectors"),
      "@interfaces": path.resolve(__dirname, "src/app/Types"),
      "@app": path.resolve(__dirname, "src/app"),
      "@components": path.resolve(__dirname, "src/common/Components"),
      "@hooks": path.resolve(__dirname, "src/common/Hooks"),
      "@utils": path.resolve(__dirname, "src/common/Utils"),
      "@common": path.resolve(__dirname, "src/common"),
      "@auth": path.resolve(__dirname, "src/features/Auth"),
      "@features": path.resolve(__dirname, "src/common/Features"),
    },
  },
};
