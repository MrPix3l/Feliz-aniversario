class VideoGallery {
    constructor(containerSelector, prevBtnSelector, nextBtnSelector) {
        this.container = document.querySelector(containerSelector);
        this.videos = this.container.querySelectorAll('.video-container');
        this.prevBtn = document.querySelector(prevBtnSelector);
        this.nextBtn = document.querySelector(nextBtnSelector);
        this.currentVideoIndex = 0;

        this.init();
    }

    init() {
        this.showVideo(this.currentVideoIndex);
        this.prevBtn.addEventListener('click', () => this.showPrevVideo());
        this.nextBtn.addEventListener('click', () => this.showNextVideo());
        this.addPlayEventToVideos();
    }

    showVideo(index) {
        this.videos.forEach((video, i) => {
            video.classList.toggle('active', i === index);
        });
    }

    showPrevVideo() {
        this.currentVideoIndex = (this.currentVideoIndex === 0) ? this.videos.length - 1 : this.currentVideoIndex - 1;
        this.showVideo(this.currentVideoIndex);
    }

    showNextVideo() {
        this.currentVideoIndex = (this.currentVideoIndex === this.videos.length - 1) ? 0 : this.currentVideoIndex + 1;
        this.showVideo(this.currentVideoIndex);
    }

    addPlayEventToVideos() {
        this.videos.forEach(videoContainer => {
            const video = videoContainer.querySelector('video');

            video.addEventListener('play', () => {
                this.videos.forEach(v => {
                    const otherVideo = v.querySelector('video');
                    if (otherVideo !== video) {
                        otherVideo.pause();
                    }
                });
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new VideoGallery('.video-gallery', '#prev-btn', '#next-btn');
});

