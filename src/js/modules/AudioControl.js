export class AudioControl {
  constructor(audioSrc = '') {
    this.isAudioPlay = true;
    this.audio = new Audio();
    this.audioSrc = audioSrc;
    this.audioInitialVolume = 0.1;
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

  events() {
    const muteButtonClick = () => {
      window.removeEventListener('click', muteButtonClick);
      window.removeEventListener('keydown', muteButtonClick);
      this.onMuteClick();
      setTimeout(() => {
        this.setSmoothVolume(0.02);
      }, 5000);
    };

    window.addEventListener('click', muteButtonClick, { once: true });
    window.addEventListener('keydown', muteButtonClick, { once: true });
  }

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
}
