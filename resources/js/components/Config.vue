<template>
    <div class="container" v-if="this.booted">
        <template v-if="lastfmAuthenticated">
            <div class = "row mt-3">
                <div class = "col-12">
                    <h5>User Key</h5>
                    <div class = "form-group">
                        
                        <input class = "form-control" :value="(configData.key)?(configData.key):('')"/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4">
                    <div class="media mt-4 mb-3 useraccount">
                        <img class="mr-3" :src="(configData.spotify_profile.images)?(configData.spotify_profile.images[0]['#text']):('./assets/default-user.png')">
                        <div class="media-body">
                            <h6 class="mt-0">Logged in as <strong>{{ configData.spotify_profile.name }}</strong>!</h6>
                            <button class="btn btn-danger btn-sm mb-2" @click.prevent="logoutLastfm">Log out</button>
                            <!-- <button class="btn btn-danger btn-sm mb-2" @click.prevent="revokeSpotify">Revoke</button> -->
                        </div>
                    </div>
               
                    <now-playing></now-playing>
               
                </div>
                <div class="col-lg-8">
                    <generate-playlist-form></generate-playlist-form>
                </div>
            </div>
        </template>
        <template v-else>
            <h5 class="mt-4">No Last.fm account connected.</h5>
            <div class = "form-group">
                <label class = "">Last.fm User ID:</label>
                <input class = "form-control" v-model="lastfmuserid"/>
                <!-- <small class = "text-danger">Invalid user id. Please use correct user id</small> -->
            </div>
            <button class = "btn btn-success" style = "width : 100%" @click.prevent="authorizeLastFM">Connect</button>
        </template>
    </div>
</template>

<script>
    import GeneratePlaylistForm from './config/GeneratePlaylistForm';
    import NowPlaying from './common/NowPlaying';
    import { mapState } from 'vuex';

    export default {
        name: 'Config',

        components: {
            GeneratePlaylistForm,
            NowPlaying
        },

        data () {
            return {
                lastfmuserid: "",
                authPopup: null,                // The Spotify auth popup instance.
                booted: false,                  // Whether or not the config has booted.
                configData: {},                 // The broadcaster's config data.
                lastfmAuthenticated: false,    // Whether or not Spotify has been authenticated by the broadcaster.
            };
        },

        computed: mapState(['auth', 'client']),

        created () {
            EventBus.$on('authenticated', this.getConfigData);
            EventBus.$on('playlist-generated', this.getPlaylists);
        },

        methods: {
            /**
             * Open the Spotify auth popup and listen for a response.
             *
             * @return {void}
             */
            authorizeLastFM () {

                this.$http.post(`${this.urls.Ebs}/lastfm/auth`, {
        
                    channel_id: this.client.channel_id,
                    lastfmuserid: this.lastfmuserid
                
                })
                .then(response => {

                    console.log(response);
                    if(!response.data.error)
                        this.getConfigData();
                })
                .catch(error => {
                    console.log(error);
                });

            },

            /**
             * Builds a URL query string from a JSON object.
             *
             * @param  {Object}  obj
             * @return {String}
             */
            buildQueryString (obj) {
                return '?' +
                Object.keys(obj).map(key => {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
                }).join('&');
            },

            /**
             * Gets the broadcaster's config data from the EBS.
             *
             * @return {void}
             */
            getConfigData () {
                this.$http.get(`${this.urls.Ebs}/config`, {
                    params: {
                        channel_id: this.client.channel_id,
                        username: this.auth.username
                    }
                })
                .then(response => {
                    this.configData = response.data;

                    if (!_.isEmpty(this.configData.spotify_profile)) {
                        this.lastfmAuthenticated = true;
                    }

                    this.booted = true;
                })
                .catch(error => this.error(error));
            },

            /**
             * Receives a message from the Spotify auth popup.
             *
             * @param  {Object}  msg
             * @return {void}
             */
            receivePopupMessage (msg) {
                logger('Got new window message: ' + msg.data);

                // Display an error message, allow re-auth.
                if (msg.data == 'spotify-auth-error') {
                    // TODO: Better error handling?
                }

                // Fetch new config data with Spotify details.
                if (msg.data == 'spotify-auth-complete') {
                    this.getConfigData();
                }

                // Close the popup.
                this.authPopup.close();
                this.authPopup = null;

                // Stop listening for events from the popup.
                window.removeEventListener('message', this.receivePopupMessage);
            },

            /**
             * Disconnect from lastfm
             */
            logoutLastfm(){
                this.$http.post(`${this.urls.Ebs}/lastfm/logout`)
                .then(response => {
                    this.playlists = null;
                    this.lastfmAuthenticated = false;
                    this.getConfigData();
                })
                .catch(error => this.error(error));
            },

            /**
             * @TEMP Refresh Spotify tokens.
             *
             * @return {void}
             */
            refreshSpotify () {
                this.$http.post(`${this.urls.Ebs}/spotify/refresh`)
                .then(response => logger('Tokens refreshed on EBS.'))
                .catch(error => this.error(error));
            },

            /**
             * Revoke access to Spotify.
             *
             * @return {void}
             */
            revokeSpotify () {
                this.$http.delete(`${this.urls.Ebs}/spotify/revoke`)
                .then(response => {
                    this.playlists = null;
                    this.lastfmAuthenticated = false;
                    this.getConfigData();
                })
                .catch(error => this.error(error));
            }
        }
    }
</script>
