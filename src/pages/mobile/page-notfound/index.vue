<template lang="jade" src="./index.jade"></template>
<style scoped lang="sass" src="./index.scss"></style>

<script>
  import native from '../../../util/native'
  import DownloadBar from '../../../components/mobile/DownloadBar'

  export default {
    el: '#root',
    components: {
      'download-bar': DownloadBar
    },
    data () {
      return {
          msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      downloadByAndroid () {
        native.download('404页面', 'android')
      },
      downloadByIOS () {
        native.download('404页面', 'ios')
      }
    }
  }

//  $('.android-btn').tap(function(){
//    native.download('404页面', 'android');
//  });
//
//  $('.ios-btn').tap(function() {
//    native.download('404页面', 'ios');
//  })
</script>
