# Gethr Twitch Extension

## Configuring
To setup the extension for building, and to serve the frontend assets for development, create a `.env` file with fields from `.env.example`.

The `.env` provides the Extension with the version, the URL to be able to communicate with the EBS, and details to communicate with the Gethr API.

## Running for development
Development for this extension is intended to be used with the [Twitch Developer Rig](https://github.com/twitchdev/developer-rig). To serve the frontend assets:

1. Generate SSL certificates using `yarn cert`.
2. Configure the `.env` so that both `MIX_APP_DEBUG` and `MIX_DEVELOPER_RIG` are true.
3. Compile assets using `yarn dev`.
4. Then serve assets using `yarn frontend`.
    - This just spins up a local web server, this is not needed to deploy on Twitch.
5. View the extension on your developer rig.

## Deploying on Twitch
To deploy on Twitch, you need to upload a `.zip` file of all the assets to https://dev.twitch.tv. To do so:

1. Configure the `.env` so that both `MIX_APP_DEBUG` and `MIX_DEVELOPER_RIG` are false.
    - Setting `MIX_APP_DEBUG` to false disables console output, which is a requirement from Twitch.
2. Compile assets using `yarn prod`.
3. Compress the following files/directories in the `public` directory into the root of a zip folder:
    - `/css`
    - `/fonts`
    - `/img`
    - `/js`
    - All relevant `.html` files.
4. Upload the zip to https://dev.twitch.tv under Dashboard > Extensions > <Extension> > Versions > <Version> > Version Assets
5. Once your assets have been uploaded, you can move the Extension to a "Hosted Test" which will serve the Extension from Twitch to test.
6. After confirming everything is working, you will need to fill out the Review Details and mark the Extension for review.
    - There will need to be a stream live with the extension installed and active during the review period.
7. Once reviewed and approved, just mark as live!
