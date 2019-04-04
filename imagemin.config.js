module.exports = {
  mozjpeg: { progressive: true, quality: 80 },
  pngquant: { quality: 80 },
  svgo: {
    plugins: [{ removeViewBox: false }, { cleanupIDs: true }],
  },
  webp: { quality: 80 },
}
