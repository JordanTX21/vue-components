<template>
  <video ref="media"></video>
</template>
<script setup>
import Hls from 'hls.js'

const emit = defineEmits()
const props = defineProps({
  options: {
    type: Object,
    default() {
      return {
        type: "",
        src: '',
        preload: true,
        autoplay: true,
        isLoop: false,
        isMuted: false,
        poster: '',
        playsinline: true,
        crossOrigin: false,
        controls: 'progress,current,durration,volume'
      }
    },
  }
})

const media = ref(null)
const hls = ref(null)

const dataLength = ref(0)
const loadedLength = ref(0)
const playedLength = ref(0)
const playing = ref(false)
const playedTime = ref('00:00')
const lengthTime = ref('00:00')
const volume = ref(1)
const volumeBarShow = ref(false)
const error = ref(false)
const muted = ref(false)

function initMedia() {
  media.value.preload = props.options.preload||true;
  media.value.autoplay = props.options.autoplay||false;
  media.value.poster = props.options.poster||'';
  if(props.options.isMuted){
    setMute()
  }
  if(props.options.playsinline){
    media.value.setAttribute('playsinline', props.options.playsinline)
    media.value.setAttribute('webkit-playsinline', props.options.playsinline)
    media.value.setAttribute('x5-playsinline', props.options.playsinline)
    media.value.setAttribute('x5-video-player-type', 'h5')
    media.value.setAttribute('x5-video-player-fullscreen', false)
  }
  if(props.options.crossOrigin){
    media.value.crossOrigin = props.options.options
  }
  if (!Hls.isSupported() || (props.options.type && (props.options.type==='application/x-mpegURL'||props.options.type==='application/vnd.apple.mpegURL'))) {
    console.warn('hls.js is required to support m3u8')
    media.value.src = props.options.src
    return;
  }
  if(!hls.value) hls.value = new Hls()

  hls.value.loadSource(props.options.src)
  hls.value.attachMedia(media.value)
  if(props.options.autoplay){
    hls.value.on(Hls.Events.MANIFEST_PARSED,function (){
      media.value.play()
    })
  }
  media.value.addEventListener('play', (e)=>{onMediaPlay();emit('onplay',e);})
  media.value.addEventListener('playing', (e)=>{onMediaPlay();emit('onplaying',e);})
  media.value.addEventListener('pause',  (e)=>{onMediaPause();emit('onpause',e);})
  media.value.addEventListener('abort', (e)=>{onMediaPause();emit('onabort',e);})
  media.value.addEventListener('progress', (e)=>{onMediaProgress();emit('onprogress',e);})
  media.value.addEventListener('durationchange', (e)=>{onMediaDurationChange();emit('ondurationchange',e);})
  media.value.addEventListener('seeking', (e)=>{onMediaSeeking();emit('onseeking',e);})
  media.value.addEventListener('seeked', (e)=>{onMediaSeeking();emit('onseeked',e);})
  media.value.addEventListener('timeupdate', (e)=>{onMediaSeeking();emit('ontimeupdate',e);})
  media.value.addEventListener('volumechange', (e)=>{onMediaVolumeChange(media.value.volume);emit('onvolumechange',e);})
  media.value.addEventListener('ended', (e)=>{onMediaEnded();emit('onended',e);})
  media.value.addEventListener('error', (e)=>{onMediaError();emit('onerror',e);})
}

function togglePlay(){
  if(playing.value){
    media.value.pause()
  }else {
    media.value.play()
  }
}
function pauseMedia(){
  if(playing.value){
    media.value.pause()
  }
}
function toggleMuted(){
  if(muted.value){
    volume.value = 1
    media.value.volume = 1
    muted.value = false
  }else{
    setMute()
  }
}
function setMute(){
  volume.value = 0
  media.value.volume = 0
  muted.value = true
}
function onMediaPlay(){
  error.value = false;
  playing.value = true;
}
function onMediaPause(){
  playing.value = false
}
function onMediaProgress(){
  if (media.value && media.value.buffered.length) {
    loadedLength.value = media.value.buffered.end(media.value.buffered.length - 1)
  } else {
    loadedLength.value = 0
  }
}
function onMediaDurationChange(){
  if (media.value.duration !== 1) {
    dataLength.value = media.value.duration;
    lengthTime.value = Utils.turnTime(parseInt(media.value.duration))
  }
  emit('progress', {loaded:loadedLength.value, played:playedLength.value, length:dataLength.value})
}
function onMediaSeeking(){
  if(!media.value) return
  playedLength.value = media.value.currentTime;
  playedTime.value = Utils.turnTime(parseInt(media.value.currentTime))
  emit('progress', {loaded:loadedLength.value, played:playedLength.value, length:dataLength.value})
}
function onMediaVolumeChange(v){
  volume.value = v
  media.value.volume = v
}
function onMediaEnded(){
  if(props.options.isLoop){
    media.value.play()
  }
}
function onMediaError(){}

onMounted(()=>{
  initMedia()
})

defineExpose({ togglePlay, pauseMedia, toggleMuted, setMute });
</script>