<template>
    <div class="container">
        <template v-if="booted">
            <now-playing class="mt-3"></now-playing>
        </template>
    </div>
</template>

<script>
    import NowPlaying from './common/NowPlaying';

    export default {
        name: 'Mobile',

        components: {
            NowPlaying
        }
    }
</script>
