/** @returns {import('webpack').Configuration} Webpack Configuration */
module.exports = (config, { mode }) => {
  if (mode === 'development') {
    // Add dev plugin
  }

  // Add custom rules for your project
  // config.module.rules.push(YOUR_RULE)

  // Add custom plugins for your project
  // config.plugins.push(YOUR_PLUGIN)

  config.plugins.forEach((plugin) => {
    if (plugin.constructor.name === 'HtmlWebpackPlugin') {
      plugin.options.title = process.env.npm_package_displayName
      plugin.options.templateParameters = {
        brandName: process.env.npm_package_displayName,
        ogUrl: process.env.npm_package_homepage,
        ogTitle: process.env.npm_package_displayName,
        ogDescription: process.env.npm_package_description,
        ogImage: '',
        manifest: '/manifest.webmanifest',
        ...plugin.options.templateParameters
      }
    }
  })

  return config
}
