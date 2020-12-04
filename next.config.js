module.exports = {
  webpack: (config) => ({
    ...config,
    entry: () =>
      config.entry().then((entry) => ({
        ...entry,
        embeddedLibrary: './embeddeds'
      }))
  })
}
