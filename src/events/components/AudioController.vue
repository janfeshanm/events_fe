<template>
  <q-page-sticky v-if="isActive" position="bottom-right" :offset="[18, 18]">
    <q-card
      >Find and Filter [keywords]
      <br />
      Go to Next Event<br />Go to Previous Event<br />More Info<br />Help</q-card
    >
    <q-circular-progress
      role="progressbar"
      id="combo"
      aria-label="Aria Name"
      clickable
      @click="handleClick"
      :value="100"
      show-value
      class="text-white q-ma-md cursor-pointer"
      size="90px"
      :thickness="0.2"
      :color="isRecording ? 'red' : 'green'"
      center-color="grey-8"
      track-color="transparent"
      ><q-icon :name="isRecording ? 'square' : 'mic'"
    /></q-circular-progress>
  </q-page-sticky>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
const isActive = ref(false);
const isRecording = ref(false);

onMounted(() => {
  //await handleClick();
});

checkMic();
//checkVoices();
let adChunks: BlobPart[] = [];
let mRecorder = <MediaRecorder | null>null;
// async function record() {
//   await navigator.mediaDevices
//     .getUserMedia({ audio: true })
//     .then(function (stream) {
//       mRecorder = new MediaRecorder(stream);

//       mRecorder.ondataavailable = function (event) {
//         adChunks.push(event.data);
//       };
//       mRecorder.onstop = async function () {
//         const audioBlob = new Blob(adChunks, { type: 'audio/mp3' });
//         console.log('2Recording stoped and audio blob created:');
//         isRecording.value = false;
//         const audioUrl = URL.createObjectURL(audioBlob);
//         const audio = new Audio(audioUrl);
//         await audio.play();
//         adChunks = [];
//         mRecorder = null;
//         stream.getAudioTracks().forEach(function (track) {
//           track.stop();
//         });
//       };
//       mRecorder.onstart = function () {
//         console.log('2Recording started');
//         isRecording.value = true;
//       };
//     })
//     .catch(function () {
//       console.log('2Recording failed');
//     });
// }

async function handleClick() {
  if (mRecorder == null) {
    await checkVoices();
  }
  if (mRecorder)
    if (mRecorder.state === 'recording') {
      stopRecording();
    } else {
      isRecording.value = true;
      await new Audio('beep.mp3').play();
      mRecorder.start();
    }
}

function stopRecording() {
  isRecording.value = false;
  if (mRecorder) {
    mRecorder.stop();
    if (adChunks.length > 0) {
      const audioBlob = new Blob(adChunks, { type: 'audio/mp3' });
      adChunks = [];
      silenceCounter = 0;
      speechCounter = 0;
      // const audioUrl = URL.createObjectURL(audioBlob);
      // const audio = new Audio(audioUrl);
      // audio
      //   .play()
      //   .then(() => {})
      //   .catch(() => {});
      getText(audioBlob);
    }
    mRecorder = null;
    //await handleClick();
  }
}

async function checkMicrophonePermission() {
  if (navigator.permissions) {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: <PermissionName>'microphone',
      });

      if (permissionStatus.state === 'granted') {
        console.log('Microphone access granted.');
        return true;
      } else if (permissionStatus.state === 'denied') {
        console.log('Microphone access denied.');
        return false;
      } else if (permissionStatus.state === 'prompt') {
        console.log('Microphone access not yet requested or user needs to be prompted.');
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then(() => {
            isActive.value = true;
          })
          .catch(() => {});
        return false;
      }
    } catch (error) {
      console.error('Error querying microphone permission:', error);
      return false;
    }
  } else {
    console.warn('Permissions API not supported in this browser.');
    // Fallback: Attempt to use getUserMedia and handle potential errors
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access implicitly granted via getUserMedia.');
      return true;
    } catch (error) {
      console.error('Error attempting getUserMedia:', error);
      return false;
    }
  }
}

function checkMic() {
  checkMicrophonePermission()
    .then((res) => {
      isActive.value = res ? res : false;
    })
    .catch(() => {});
}

const audioContext = new window.AudioContext();
async function decodeWebMOpus(arrayBuffer: ArrayBuffer): Promise<number | void> {
  try {
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const bfr = audioBuffer.getChannelData(0);
    return Math.abs(bfr.reduce((accumulator, currentValue) => accumulator + currentValue, 0));

    //source.connect(audioContext.destination);
    //source.start();
  } finally {
    /* empty */
  }
}

let speechCounter = 0;
let silenceCounter = 0;
let sDetector = 0.4;
async function checkVoices() {
  await navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      mRecorder = new MediaRecorder(stream);

      mRecorder.ondataavailable = async function (bev) {
        const ab = await bev.data.arrayBuffer();
        if (isRecording.value) {
          const val = await decodeWebMOpus(ab);
          if (val) {
            if (val > sDetector) {
              adChunks.push(bev.data);
              speechCounter++;
              silenceCounter = 0;
              sDetector = 0.1;
            } else {
              sDetector = 0.4;
              if (speechCounter > 0) silenceCounter++;
              if (silenceCounter > 2) stopRecording();
            }
          }
        }
      };
      mRecorder.onstop = function () {
        if (isRecording.value) mRecorder?.start();
        else {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
        }
      };
      mRecorder.onstart = function () {
        setTimeout(() => {
          mRecorder?.stop();
        }, 1000);
      };
    })
    .catch(function () {
      console.log('3Recording failed');
    });
}

// function startRecording(fn: (bl: Blob) => void) {
//   if (isActive.value) {
//     const audioChunks: BlobPart[] = [];
//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then(function (stream) {
//         const mediaRecorder = new MediaRecorder(stream);

//         mediaRecorder.ondataavailable = function (event) {
//           audioChunks.push(event.data);
//         };
//         mediaRecorder.onstop = function () {
//           const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
//           console.log('Recording stoped and audio blob created:');
//           fn(audioBlob);
//         };
//         mediaRecorder.onstart = function () {
//           console.log('Recording started');
//           setTimeout(() => {
//             mediaRecorder.stop();
//           }, 5000);
//         };
//         mediaRecorder.start();
//       })
//       .catch(function () {
//         console.log('Recording failed');
//       })
//       .finally(() => {
//         console.log('Recording finished');
//       });
//   }
// }

function urlDownload(audioBlob: Blob, filename?: string): string | void {
  const audioUrl = URL.createObjectURL(audioBlob);
  const a = document.createElement('a');
  a.href = audioUrl;
  a.download = filename + '_rec_' + Date.now() + '.mp3';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
  return a.download;
}

// function getTextFromAudioAndDownload() {
//   startRecording(getText);
// }

function getText(blob1: Blob) {
  const url = `https://api.elevenlabs.io/v1/speech-to-text`;

  const form = new FormData();
  form.append('language_code', 'en');
  form.append('model_id', 'scribe_v1');
  form.append('file', new File([blob1], 'audio.mp3'));

  fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': 'sk_2f9a9898d71f8a0836403d2fd39e5e76dedc936e57f585fa',
    },
    body: form,
  })
    .then((response) => {
      if (!response.ok) {
        response
          .text()
          .then((text) => {
            throw new Error(`ElevenLabs API error: ${response.status} - ${text}`);
          })
          .catch((err) => console.log(err));
      }
      response
        .json()
        .then((json1: { text: string }) => {
          console.log(json1);
          runCommand(json1.text);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
const emits = defineEmits<{
  (e: 'runCommand', command: string): void;
}>();

function runCommand(command: string) {
  emits('runCommand', command);
}

function speak(text: string): string | void {
  return generateSpeech(text);
}

function listen(): string {
  console.log('listen');
  return 'listened';
}

defineExpose({ speak, listen, handleClick });

function generateSpeech(text: string): string | void {
  console.log('Generating speech for:', text);
  const url = `https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': 'sk_2f9a9898d71f8a0836403d2fd39e5e76dedc936e57f585fa',
    },
    body: JSON.stringify({
      text: text,
      model_id: 'eleven_monolingual_v1', // Or 'eleven_multilingual_v2' for multilingual
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    }),
  })
    .then((response) => {
      if (!response.ok) {
        response
          .text()
          .then((errorText) => {
            throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`);
          })
          .catch(() => {});
      }

      response
        .blob()
        .then(async (audioBlob) => {
          const audioUrl = URL.createObjectURL(audioBlob);
          urlDownload(audioBlob, text);
          const audio = new Audio(audioUrl);
          await audio.play();

          console.log('Speech generated and playing...');
        })
        .catch(() => {});
    })
    .catch(() => {});
}
</script>
