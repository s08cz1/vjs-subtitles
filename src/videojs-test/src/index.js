import 'video.js/dist/video-js.min.css';


// libraries
import videojs from 'video.js';

    // configuration for video.js
let options = {
    controls: true,
    bigPlayButton: false,
    autoplay: false,
    loop: false,
    fluid: false,
    width: 600,
    height: 300,
};
let player = videojs('myClip', options, () => {
    // print version information at startup
    let msg = `Using video.js ${videojs.VERSION}`;
    videojs.log(msg);

    // load wav file from url
});

player.ready(() => {
    const trackEl = player.addRemoteTextTrack({
        src: 'GOPR3467.vtt', 
        kind: 'captions', 
        label: 'timings', 
        default: true, 
        language: 'en'
    }, false);
  });

player.src({src: 'GOPR3467.MP4', type: 'video/mp4'});
