module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'custom-properties': false,
        'focus-within-pseudo-class': false,
        'focus-visible-pseudo-class': false,
        'custom-media-queries': true,
      }
    })
  ]
};