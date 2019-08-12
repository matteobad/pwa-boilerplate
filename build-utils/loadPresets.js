const webpackMerge = require('webpack-merge');

const loadPresets = (argv) => {
  const presets = argv.presets || [];

  const mergedPresets = [].concat(...[presets]);
  const mergedConfigs = mergedPresets.map(presetName => {
    return require(`./presets/webpack.${presetName}`)(argv);
  });

  return webpackMerge({}, ...mergedConfigs);
};

module.exports = loadPresets;
