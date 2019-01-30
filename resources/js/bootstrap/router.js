import Router from 'vue-router';
import Vue from 'vue';

import Config from './../components/Config';
import Dashboard from './../components/Dashboard';
import Mobile from './../components/Mobile';
import Panel from './../components/Panel';
import VideoComponent from './../components/VideoComponent';
import VideoFullscreen from './../components/VideoFullscreen';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '*/config.html',
            component: Config
        },
        {
            path: '*/dashboard.html',
            component: Dashboard
        },
        {
            path: '*/mobile.html',
            component: Mobile
        },
        {
            path: '*/panel.html',
            component: Panel
        },
        {
            path: '*/video_component.html',
            component: VideoComponent
        },
        {
            path: '*/video_fullscreen.html',
            component: VideoFullscreen
        }
    ],
    mode: 'history'
});
