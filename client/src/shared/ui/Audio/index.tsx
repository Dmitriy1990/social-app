import React, { useRef, useState, useEffect } from 'react';
import aud from '../../../assets/audio/1.mp3';
import styles from './style.module.scss';

export const Audio = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [range, setRange] = useState('100');
  const audioRef = useRef<HTMLAudioElement>(null);
  const bufferAmountRef = useRef<HTMLDivElement>(null);
  const progressAmountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currTimeRef = useRef<HTMLInputElement>(null);

  const play = () => {
    if (audioRef && audioRef.current) {
      setIsPlay(true);
      audioRef.current.play();
    }
  };

  const pause = () => {
    if (audioRef && audioRef.current) {
      setIsPlay(false);
      audioRef.current.pause();
    }
  };

  const displayBufferedAmount = () => {
    if (audioRef.current && bufferAmountRef.current) {
      const bufferedAmount = audioRef.current.buffered.length
        ? Math.floor(audioRef.current.buffered.end(audioRef.current.buffered.length - 1))
        : 0;
      const duration = audioRef.current.duration;
      if (duration > 0) {
        bufferAmountRef.current.style.width = (bufferedAmount / duration) * 100 + '%';
      }
    }
  };

  const handleEnded = () => {
    if (audioRef && audioRef.current) {
      audioRef.current.currentTime = 0;
      setIsPlay(false);
    }
  };

  const update = () => {
    if (progressAmountRef.current && audioRef.current && currTimeRef.current) {
      const duration = audioRef.current.duration;
      if (duration > 0) {
        progressAmountRef.current.style.width =
          (audioRef.current.currentTime / duration) * 100 + '%';
      }
      currTimeRef.current.textContent = formatTime(audioRef.current.currentTime);
    }
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return min + ':' + (sec < 10 ? '0' + sec : sec);
  };

  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.addEventListener('progress', displayBufferedAmount);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('timeupdate', update);
    }
    return () => {
      audioRef?.current?.removeEventListener('progress', displayBufferedAmount);
      audioRef?.current?.removeEventListener('ended', handleEnded);
      audioRef?.current?.removeEventListener('timeupdate', update);
    };
  }, []);

  const scrub = (e: any) => {
    if (audioRef && audioRef.current && progressRef && progressRef.current) {
      const seconds =
        audioRef.current.duration * (e.nativeEvent.offsetX / progressRef.current.offsetWidth);
      if (seconds > 0) {
        audioRef.current.currentTime = seconds;
      }
      console.log('audioRef.current.currentTime', audioRef.current.currentTime);
      console.log('seconds', seconds);
    }
  };

  const genSlideStyle = (value: number) => {
    return {
      range: {
        width: `${value}%`,
      },
    };
  };

  const slideStyle = genSlideStyle(+range);

  const setVolume = () => {
    if (audioRef && audioRef.current && inputRef && inputRef.current) {
      audioRef.current.volume = +inputRef.current.value / 100;
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={aud} />
      <div className={styles.container}>
        {isPlay ? (
          <div className={styles.pause} onClick={pause} />
        ) : (
          <div className={styles.play} onClick={play} />
        )}
        <div className={styles.container__inner}>
          <div className={styles.head}>
            <h3 className={styles.title}>Guitar Sound</h3>
            <div className={styles.currentTime} ref={currTimeRef}>
              0:00
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.progressContainer} onClick={(e) => scrub(e)} ref={progressRef}>
              <div className={styles.buffered}>
                <span className={styles.buffered__amount} ref={bufferAmountRef}></span>
              </div>
              <div className={styles.progress}>
                <span className={styles.progress__amount} ref={progressAmountRef}></span>
              </div>
            </div>
            <div className={styles.range}>
              <div className={styles.range__value} style={slideStyle.range} />
              <input
                className={styles.range__slide}
                ref={inputRef}
                type="range"
                min="0"
                max="100"
                step="1"
                onInput={setVolume}
                onChange={(e) => setRange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
