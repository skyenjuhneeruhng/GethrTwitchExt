// Load in our JavaScript dependencies.
require('./bootstrap/bootstrap');
import App from './components/App';
import Vue from 'vue';
import Vuex from 'vuex';

import store from './bootstrap/store';
import router from './bootstrap/router';

// Add applicable fontawesome icons.
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/fontawesome-free-brands';

library.add(faCheck);
library.add(faPlus);
library.add(faSpotify);
library.add(faTimes);

// Map global objects to Vue.
Vue.prototype.$http = axios;
Vue.mixin(require('./mixin'));

// Vendor Vue Components.
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('font-awesome-icon', FontAwesomeIcon);

// Create a fresh Vue instance and attach it to the page.
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

// Setup for Twitch Extension auth stuff.
require('./bootstrap/twitch-ext');
require('./bootstrap/tracking');
