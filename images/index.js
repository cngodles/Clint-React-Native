const appImages = {
	loaded: true,
  name: 'App Images',
  tSampleicon1: require('./tSampleicon1.png'),
  tSampleicon2: require('./tSampleicon2.png'),
  ///you can add more many images like this here.
};

console.log("Is appImages loaded? "+appImages.loaded, appImages.name);

module.exports = appImages;