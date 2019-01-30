<template>
    <div class="video-component-wrapper" v-if="booted">
        <now-playing :scale="true"></now-playing>
    </div>
</template>

</template>

<script>
    import NowPlaying from './common/NowPlaying';

    export default {
        name: 'VideoComponent',

        components: {
            NowPlaying
        }
    }
</script>
