export class BaseAudioControl {
  constructor(audioSrc = '') {
    this.isAudioPlay = true;
    this.audio = new Audio();
    this.audioSrc = audioSrc;
    this.audioInitialVolume = 1;
    this.currentVolume = this.audioInitialVolume;

    this.onInit = this.onInit.bind(this);
    this.events = this.events.bind(this);
    this.onMuteClick = this.onMuteClick.bind(this);

    this.onInit();
    this.events();
  }

  onInit() {
    if (!this.audioSrc) {
      console.error(`No "audioSrc" provided at "new ${this.constructor.name}" class call`);
      return;
    }

    this.audio.src = this.audioSrc;
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = this.currentVolume;
  }

  events() {}

  setSmoothVolume = (targetVolume = 0) => {
    const volumeStep = 0.01;

    if (this.audio.volume > targetVolume) {
      const volumeDownInterval = setInterval(() => {
        if (this.audio.volume > targetVolume) {
          this.currentVolume -= volumeStep;
          this.audio.volume = this.currentVolume;
        } else {
          clearTimeout(volumeDownInterval);
        }
      }, 100);
    } else {
      const volumeDownInterval = setInterval(() => {
        if (this.audio.volume < targetVolume) {
          this.currentVolume += volumeStep;
          this.audio.volume = this.currentVolume;
        } else {
          clearTimeout(volumeDownInterval);
        }
      }, 100);
    }
  };

  onMuteClick() {
    if (this.isAudioPlay) {
      this.audio.play();
    } else {
      this.audio.pause();
    }

    this.isAudioPlay = !this.isAudioPlay;
  }

  stopAudio = () => {
    this.audio.pause();
    this.isAudioPlay = false;
  };
}
