import 'video.js/dist/video-js.min.css';

// libraries
import videojs from 'video.js';

// configuration for video.js
const options = {
    controls: true,
    bigPlayButton: false,
    autoplay: false,
    loop: false,
    fluid: false,
    width: 600,
    height: 300,
    // textTrackSettings: false // with this set to false, we wouldn't be able to set the settings here
};
const player = videojs('myClip', options, () => {
    // print version information at startup
    const msg = `Using video.js ${videojs.VERSION}`;
    videojs.log(msg);
});
const captionsDiv = document.getElementById('captions');

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
    player.addRemoteTextTrack({
        src: 'GOPR3467.vtt', 
        kind: 'captions', 
        label: 'Timings 100ms', 
        default: true, 
        language: 'en'
    }, false);

    const tracks = player.textTracks();
    const track = tracks[0]; // very naive but in this example we know there is always one track
    track.addEventListener('cuechange', (ev) => {
        const cues = track.activeCues;
        captionsDiv.innerHTML = cues[0].text; // again, very naive assumption, but in this simple example we don't care
    });
 });

player.src({src: 'GOPR3467.MP4', type: 'video/mp4'});
