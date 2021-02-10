const _ = require('lodash');

// module variables
const config = require('./config/app-configs.json');
const defaultConfig = config.pte;
const environment = process.env.NODE_ENV || 'pte';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);


global.gConfig = finalConfig;
//console.log(`global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation)}`);
