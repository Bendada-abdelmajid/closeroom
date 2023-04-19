import React from 'react'
import { useState } from 'react';
import {GrPauseFill, GrPlayFill } from "react-icons/gr";
export default function Audio({src}) {
    const [playState, setPlayState]=useState(false)
    function playAudio(e){
      setPlayState(true)
      
      const audio = e.target.parentElement.querySelector("audio")
     audio.play()

    }
    function pauseAudio(e){
      setPlayState(false)
      const audio = e.target.parentElement.querySelector("audio")
      audio.pause()
    }
    function withupdate(e) {
      const progressBar=e.target.parentElement.querySelector(".progress-bar")
      const currentTime = e.target.currentTime; //getting playing song currentTime
      const duration = e.target.duration; //getting playing song total duration
      let progressWidth = (currentTime / duration) * 100;
      progressBar.style.width = `${progressWidth}%`;
    }
    function progress(e){
      const progressBar=e.target.parentElement.querySelector(".progress-bar")
      const audio=e.target.parentElement.parentElement.querySelector("audio")
        let silderValue = e.target.value;
        let widths = silderValue + "%";
        progressBar.style.width = widths;
        let clickedOffsetX = silderValue / 100;
        let songDuration = audio.duration; //getting song total duration
        audio.currentTime = clickedOffsetX * songDuration;
   
    }
    function getDuration(e) {
      const musicDuartion= e.target.parentElement.querySelector(".time")
      let duration = e.target.duration;
      let totalHour = Math.floor(duration / 3600);
      let min = Math.floor(duration % 3600);
      let totalMin = Math.floor(min / 60);
      let totalSec = Math.floor(min % 60);
      if (totalMin < 10) {
        //if min is less than 10 then add 0 before it
        totalMin = `0${totalMin}`;
      }
      if (totalSec < 10) {
        //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
      }
      if (duration > 3600) {
        musicDuartion.innerText = `${totalHour}:${totalMin}:${totalSec}`; //passing total duation of song
      } else {
        musicDuartion.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
      }
    }
 
      
  return (
    <div className="audio-player center">
        {playState ? 
        <div className="btn center" onClick={pauseAudio}>
          <GrPauseFill />
        </div>: 
        <div className="btn center"  onClick={playAudio}>
          <GrPlayFill/>
        </div> }
        <div class="progress-cont">
          <div class="progress-bar"></div>
          <input type="range" min="0"  max="100"  onInput={progress}/>
        </div>
        <div className="time" >00:00</div>
        <audio src={src} style={{display: "none"}} onTimeUpdate={withupdate} onLoadedData={getDuration}></audio>
    </div>
  )
}
