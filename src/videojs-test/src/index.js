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
    // textTrackSettings: false // with this set to false, settings can't be set
};
let player = videojs('myClip', options, () => {
    // print version information at startup
    let msg = `Using video.js ${videojs.VERSION}`;
    videojs.log(msg);
});

player.ready(() => {
    const settings = player.textTrackSettings;
    settings.setDefaults();
    settings.setValues({
        'backgroundColor': '#000',
        'backgroundOpacity': '1',
        'edgeStyle': 'none',
        'fontFamily': 'proportionalSansSerif',
        'color': '#FFF',
        'fontPercent': '4.00',
        'windowColor': '#FF0',
        'windowOpacity': '0'
    });
    settings.updateDisplay();
    const trackEl = player.addRemoteTextTrack({
        src: 'GOPR3467.vtt', 
        kind: 'captions', 
        label: 'Timings 100ms', 
        default: true, 
        language: 'en'
    }, false);
 });

player.src({src: 'GOPR3467.MP4', type: 'video/mp4'});
