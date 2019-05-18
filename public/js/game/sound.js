class Sound {

	constructor() {
		this.audio = null;
		this.currentSound = 'default';

		this.playlist = {
			'default': {
                'title': 	"Skillet_-_Whispers_In_The_Dark(uzimusic.ru)",
                'src': 		'../../../sounds/',
                'format': 	'mp3',
                'volume':   0.6
            },
            'punch': {
                'title': 	"PUNCH",
                'src': 		'../../../sounds/',
                'format': 	'mp3',
                'volume':   1
            }
		}

		this.setCurrentSound('default')
	}

	setCurrentSound(title) {
		this.currentSound = title;
	}

	playSoundInLoop(soundTitle) {
		this.audio = new Audio(`${this.playlist[soundTitle].src}${this.playlist[soundTitle].title}.${this.playlist[soundTitle].format}`);
		this.audio.volume   = 0.5;
		this.audio.loop 	= true;

		var playPromise = this.audio.play();

		if (playPromise !== undefined) {
			playPromise.then(_ => {
			  // Automatic playback started!
			  // Show playing UI.
			})
			.catch(error => {
			  // Auto-play was prevented
			  // Show paused UI.
			});
		}
	}

	playSound (name) {
		console.log(`${this.playlist[name].src}${this.playlist[name].title}.${this.playlist[name].format}`)

		this.audio = new Audio(`${this.playlist[name].src}${this.playlist[name].title}.${this.playlist[name].format}`);
		this.audio.volume = this.playlist[name].volume;
		this.audio.play();
	}

	stopPlayingSound() {
		this.audio.pause();
	}
}