import { useEffect, useState } from "react";
import bgMusic from "@assets/audio/DamagedGoods.wav";
import { gsap } from "gsap";
import propTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import "./AudioPlayer.module.css";

const AudioPlayer = ({ theme }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const minVolume = "0.00";
  const maxVolume = "0.09";

  useEffect(() => {
    const audioPlayer = document.getElementById("audioPlayer");
    const storedVolume = localStorage.getItem("audioVolume");
    if (audioPlayer) {
      audioPlayer.volume = storedVolume ? parseFloat(storedVolume) : 0.02;
      audioPlayer.play().catch((error) => {
        console.log("Autoplay was prevented:", error);
      });

      // Check if the audio player is playing initially
      audioPlayer.onplay = () => setIsPlaying(true);
      audioPlayer.onpause = () => setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const audioPlayer = document.getElementById("audioPlayer");

    const handlePlayPause = () => {
      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    };

    const playPauseBtn = document.getElementById("playPauseBtn");
    playPauseBtn.addEventListener("click", handlePlayPause);
    return () => playPauseBtn.removeEventListener("click", handlePlayPause);
  }, []);

  useEffect(() => {
    const audioPlayerVolume = document.getElementById("audioPlayer-volume");
    const audioPlayer = document.getElementById("audioPlayer");

    if (audioPlayerVolume && audioPlayer) {
      const storedVolume = localStorage.getItem("audioVolume");
      if (storedVolume) {
        audioPlayerVolume.value = storedVolume;
      }

      const handleVolumeChange = (event) => {
        const volume = parseFloat(event.target.value);
        audioPlayer.volume = volume;
        localStorage.setItem("audioVolume", volume);
        // console.log("Volume changed to:", volume);
      };

      audioPlayerVolume.addEventListener("input", handleVolumeChange);

      return () =>
        audioPlayerVolume.removeEventListener("input", handleVolumeChange);
    }
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".audio-container",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  return (
    <div
      className={`audio-container grid grid-cols-1 gap-4 md:grid-cols-2 mt-8 ${theme}`}
    >
      <div className="flex justify-center md:justify-end">
        <button
          id="playPauseBtn"
          className="flex items-center justify-center w-12 h-12 p-2 text-white rounded-full shadow-lg bg-lime-700 hover:bg-lime-600 audio-button"
        >
          <FontAwesomeIcon
            icon={isPlaying ? faPause : faPlay}
            className="text-white"
          />
        </button>
      </div>
      <div className="flex items-center justify-center md:justify-start">
        <input
          id="audioPlayer-volume"
          type="range"
          min={minVolume}
          max={maxVolume}
          step="0.001"
          className="w-full max-w-xs"
        />
      </div>
      <audio id="audioPlayer" src={bgMusic}></audio>
    </div>
  );
};

AudioPlayer.propTypes = {
  theme: propTypes.string.isRequired,
};

export default AudioPlayer;
