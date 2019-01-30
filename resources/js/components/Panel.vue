<template>
    <div class="">
        <template v-if="booted">
            <now-playing class=""></now-playing>
        </template>
    </div>
</template>

<script>
    import NowPlaying from './common/NowPlaying';

    export default {
        name: 'Panel',

        components: {
            NowPlaying
        }
    }
</script>
