const video = document.getElementById("video");
const muteBtn = document.getElementById("muteBtn")
const cameraoff = document.getElementById("cameraoff")
const selectCam = document.getElementById("selectCam")
const selectMic = document.getElementById("selectMic")

let mediaStream;
let mute = false;
let camera = true;
async function getmedia() {
    try{
        const stream= await window.navigator.mediaDevices.getUserMedia({
            video:true,
            Audio:true
        }    
        );
        mediaStream=stream;
        displaymedia();
    }
    catch (error){
        console.log(error);
    }
    
}
getmedia();

function displaymedia(){
    video.srcObject= mediaStream;
    video.addEventListener('loadedmetadata', ()=>{
        video.play()
    });
}

muteBtn.addEventListener('click', ()=>{
    if(mute){
        muteBtn.textContent="Mute"
        mute=false
        mediaStream.getAudioTracks().forEach(track => {
            track.enabled=true;
            
        });
    }
    else{
        muteBtn.textContent="Unmute"
        mute=true
        mediaStream.getAudioTracks().forEach(track => {
            track.enabled=false;

        });
    }
});
cameraoff.addEventListener('click', ()=>{
    if(camera){
        cameraoff.textContent="Turn on camera"
        camera=false
        mediaStream.getVideoTracks()
        .forEach(track => {
            track.enabled=false;
            
        });
    }
    else{
        cameraoff.textContent="Turn off camera"
        camera=true
        mediaStream.getVideoTracks()
        .forEach(track => {
            track.enabled=true;

        });
    }
});


async function getScreenMedia() {
    try{
        mediaStream= await window.navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: true,
        });
        displaymedia();
    }
    catch(error){
        console.log(error);

    }
}
screenShare.addEventListener('click', getScreenMedia);


