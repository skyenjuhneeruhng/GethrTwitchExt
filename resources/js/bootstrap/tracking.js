import { Urls } from './../urls';
import sp from './sp';

;(function(p, l, o, w, i, n, g) {
    if (!p[i]) {
        p.GlobalSnowplowNamespace = p.GlobalSnowplowNamespace || [];
        p.GlobalSnowplowNamespace.push(i);
        p[i] = function() {
            (p[i].q = p[i].q || []).push(arguments);
        }
        ;
        p[i].q = p[i].q || [];
        n = l.createElement(o);
        g = l.getElementsByTagName(o)[0];
        n.async = 1;
        n.src = w;
        g.parentNode.insertBefore(n, g);
    }
}
)(window, document, "script", "./js/sp.js", "snowplow");


window.snowplow('newTracker', 'sc', `${Urls.TrackerUrl}`, { // Initialise a tracker
appId: `${Urls.AppID}`,
platform: 'web',
crossDomainLinker: function (link) { return true },
contexts: {
        webPage: true,
        performanceTiming: true
    },
post: true,
forceSecureTracker: true
});