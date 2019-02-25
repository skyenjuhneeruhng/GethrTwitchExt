<template>
    <div class="media now-playing" v-if="track && sized">
        <div class="cover-art-wrapper">
            <img
                @click="clickThrough(albumHref)"
                title = "see album"
                class="cover-art clickable"
                :src="(track.Images[0].Url)?(track.Images[0].Url):('./assets/default-music.png')"
            >
            <!-- <a :href="track.album.external_urls.spotify" class = "clickable">
                <img
                title = "see album"
                class="cover-art"
                :src="track.album.images[0].url">
            </a> -->
        </div>
        <div class="media-body">
            <!-- @TEMP Click handler will be removed, should only receive updates via Twitch PubSub. -->
            <h6 @click="fetchNowPlaying" class="text-uppercase">- Now Playing -</h6>
            <div>
                <span @click="clickThrough(trackHref)" class="clickable" title = "save song">{{ track.Name }}</span><br>
                <small @click="clickThrough(artistHref)" class="clickable" title = "follow artist"><strong>{{ track.Artist.Name }}</strong></small>
                <!-- <a :href="track.external_urls.spotify" class="clickable" title = "save song">{{ track.name }}</a><br>
                <a :href="track.artists[0].external_urls.spotify" class="clickable" title = "follow artist"><strong>{{ track.artists[0].name }}</strong></a> -->
            </div>

            <div class="icon-wrapper clickable" @click="clickThrough(playlistHref)" title = "follow playlist">
                <font-awesome-icon :icon="['fab', 'lastfm-square']" />
            </div>
            <!-- <a class="icon-wrapper clickable" :href="playlist.external_urls.spotify" title = "follow playlist">
                <font-awesome-icon :icon="['fab', 'lastfm-square']" />
            </a> -->
        </div>
    </div>
    <div class = "not-playing" v-else>
        Trying to get the track.
    </div>
</template>

<script>

    import TwitchPubSub from './TwitchPubSub';
    import { mapState } from 'vuex';

    export default {
        name: 'NowPlaying',
        extends: TwitchPubSub,

        props: {
            scale: {                // Whether or not the sizing method should be ran on creation.
                type: Boolean,
                default: false
            }
        },

        data () {
            return {
                playlist: null,     // The currently playing playlist.
                sized: true,        // Whether or not the component has been properly sized.
                sizes: {
                    coverArt: '0px',
                    fontNowPlaying: '0px',
                    fontInfo: '0px',
                    icon: '0px',
                },
                track: null         // The currently playing track.
            };
        },

        computed: {
            /**
             * Gets the Spotify URL for the current album.
             *
             * @return {String}
             */
            albumHref () {
                if (this.track == null) {
                    return null;
                }

                // return this.track.album.external_urls.spotify;
                return this.track.Url;
            },

            /**
             * Gets the Spotify URL the current artist.
             *
             * @return {String}
             */
            artistHref () {
                if (this.track == null) {
                    return null;
                }

                // return this.track.artists[0].external_urls.spotify;
                return this.track.Url;
            },

            /**
             * Gets the Spotify URL for the current playlist.
             *
             * @return {String}
             */
            playlistHref () {
                if (this.playlist == null) {
                    return null;
                }

                // return this.playlist.external_urls.spotify;
                return this.track.Url;
            },

            /**
             * Gets the Spotify URL for the current track.
             *
             * @return {String}
             */
            trackHref () {
                if (this.track == null) {
                    return null;
                }

                // return this.track.external_urls.spotify;
                return this.track.Url;
            },

            ...mapState(['client'])
        },

        created () {
            // Fetch the currently playing track from Spotify and listen for updates from the EBS.
            this.fetchNowPlaying();
            
            this.listen();
        },

        mounted () {
            // Size the component on load if scale is true.
            if (this.scale) {
                this.sized = false;
                this.size();
            }
        },

        methods: {
            /**
             * Opens the link in a new tab and collects data at time of click.
             *
             * @param  {String}  url
             * @return {void}
             */
            clickThrough (url) {
                if (!url) {
                    return;
                }

                // TODO: Send AJAX request to collect data about the stream.
                window.snowplow('trackLinkClick' , url);

                window.open(url);
            },

            /**
             * Get the currently playing track and playlist.
             *
             * @return {void}
             */
            fetchNowPlaying () {
                //logger('fetchNowPlaying');

                this.$http.get(`${this.urls.Ebs}/spotify/current`)
                .then(response => {
                    if (response.data != null) {
                        this.updateNowPlaying(response.data.playlist, response.data.track);
                    }
                })
                .catch(error => this.error(error));
            },

            /**
             * Callback for when a PubSub message is received.
             *
             * @param  {Object}  message
             * @return {void}
             */
            onPubSub (message) {
                logger('onPubSub:', message);

                if (message.type && message.type === "iglu:io.gethr/streamer_play/jsonschema/2-0-1") {
                    if (message.data && message.data.Track) {
                        this.updateNowPlaying(null, message.data.Track);
                    }                    
                }

                if (!message.header) {
                    return;
                }

                switch (message.header) {
                    case 'Now Playing': this.updateNowPlaying(message.playlist, message.track); break;
                }
            },

            /**
             * Size and scale the assets as needed for the video component.
             *
             * @return {void}
             */
            size () {
                let body = document.querySelector('.video-component');
                let height = body.offsetHeight;
                let width = body.offsetWidth;

                logger('Height: ' + height + ' Width: ' + width);

                // Size elements based on percentage.
                this.sizes.coverArt = (height - (width * 0.10)) + 'px';
                this.sizes.icon = (height * 0.23918575) + 'px';

                this.sized = true;
            },

            /**
             * Updates the Now Playing playlist and track.
             *
             * @param  {Object}  playlist
             * @param  {Object}  track
             * @return {void}
             */
            updateNowPlaying (playlist, track) {
                logger('Now Playing:', track.name);

                this.playlist = playlist;
                this.track = track;
            }
        }
    }
</script>
