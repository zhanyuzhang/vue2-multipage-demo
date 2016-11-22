<template lang="jade" src="./index.jade"></template>
</template>
<script>
import native from '../../../util/native';
    export default {
        name: 'download-bar',
        methods: {
            download() {
                native.download('404页面')
            }
        },
        props: ['msg']
    }
</script>
<style scoped lang="sass" src="./index.scss"></style>
