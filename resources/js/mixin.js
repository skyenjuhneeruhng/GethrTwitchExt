const { Urls } = require('./urls');

module.exports = {
    data () {
        return {
            booted: false
        }
    },

    computed: {
        /**
         * Return useful URLs for the Vue app.
         *
         * @return {Object}
         */
        urls () {
            return Urls;
        }
    },

    created () {
        EventBus.$on('authenticated', () => {
            this.booted = true;
        });
    },

    methods: {
        /**
         * Display an error.
         *
         * @param  {mixed}  error
         * @return {void}
         */
        error (error) {
            logger(error);
        }
    }
}
