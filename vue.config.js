module.exports = {
  outputDir: "docs",
  css: {
    sourceMap: true
  },
  publicPath: process.env.NODE_ENV === "production" ? "/dual-tone-gen/" : "/"
};
