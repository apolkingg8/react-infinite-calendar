module.exports = {
  module: {
    loaders: [
      {
        test: /(\.css|\.scss)$/,
        loaders: [
          'style',
          'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]',
          'sass?sourceMap'
        ]
      }
    ]
  }
};
