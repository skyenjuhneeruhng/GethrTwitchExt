export const Urls = {
    Ebs: process.env.MIX_APP_EBS_URL || 'https://localhost:8081',
    TwitchApi: process.env.MIX_TWITCH_API_URL || 'https://api.twitch.tv',
    AppID : process.env.App_ID || 'twitch-ext',
    TrackerUrl : process.env.TRACKER_URL || 's-dev.gethr.to'

};
