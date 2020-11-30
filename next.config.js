module.exports = {
  webpack: (config, options) => ({
    ...config,
    entry: () =>
      config.entry().then((entry) => ({
        ...entry,
        fooEntry: './hoge'
      }))
  })
}
