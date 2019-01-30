require('typeface-nunito');
import { EventBus } from './event-bus';

window._ = require('lodash');

// Debug Mode.
window.DebugMode = process.env.MIX_APP_DEBUG == 'true';

// Set global event bus.
window.EventBus = EventBus;

// Global logger.
window.logger = DebugMode ? ((window.twitch) ? window.Twitch.ext.rig.log : console.log.bind(console)) : function () {};

// Load in Axios.
window.axios = require('axios');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
