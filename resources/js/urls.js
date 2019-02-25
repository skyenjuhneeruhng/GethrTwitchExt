export const Urls = {
    Ebs: process.env.MIX_APP_EBS_URL || 'https://wfh26o9y8c.execute-api.us-east-2.amazonaws.com/dev',
    TwitchApi: process.env.MIX_TWITCH_API_URL || 'https://api.twitch.tv',
    AppID : process.env.App_ID || 'twitch-ext',
    TrackerUrl : process.env.TRACKER_URL || 's-dev.gethr.to',

};
