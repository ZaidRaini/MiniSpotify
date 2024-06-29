import { Song } from "@/Constant/Interface";
import Layout from "@/Pages/Layout/Layout";
import { IMAGE_DATA } from "@/Service/Api";
import { timer } from "@/Utils/Helper";
import { Backward, Forward } from "@/assets/SVG/Index";
import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import "@/Pages/SongPlayed/style.css";

interface List {
  data?: Song;
  handleChange?: (value: number) => void;
  currentIndex: number;
}

const SongPayer = ({ data, handleChange,currentIndex }: List) => {
  const [volum, setVolum] = useState(false);
  const [play, setPlay] = useState(false);
  const [coverImage, setCoverImage] = useState<string>("");
  const [audio] = useState(new Audio());
  const [value, setValue] = useState<number>(0);
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [currentDuration, setCurrentDuration] = useState<number | undefined>(
    undefined
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const [loop, setLoop] = useState(false);

  const fetchCover = async (coverUrl: string) => {
    try {
      const imageUrl = await IMAGE_DATA(coverUrl);
      setCoverImage(imageUrl);
    } catch (error) {
      console.log("Error fetching cover:", error);
      setCoverImage("");
    }
  };

  useEffect(() => {
    if (data?.cover) {
      fetchCover(data.cover);
    }
  }, [data]);

  useEffect(() => {
    if (data?.url) {
      audio.pause();
      audio.src = data.url;
      audio.load();
      setValue(0);
      
      audio.play();
      setDuration(undefined);
      setCurrentDuration(undefined);

      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };

      audio.ontimeupdate = () => {
        setCurrentDuration(audio.currentTime);
        setValue((audio.currentTime / audio.duration) * 100);
      };

      audio.onended = () => {
        if (loop) {
          audio.currentTime = 0;
          audio.play();
        } else {
          setPlay(false);
        }
      };

      audio.play().then(() => {
        setPlay(true);
      }).catch((error) => {
        console.log('Failed to start audio playback:', error);
      });
    }
  }, [data, audio]);

  useEffect(() => {
    audio.loop = loop;
  }, [loop, audio]);

  useEffect(() => {
    audio.volume = volum ? 0 : 1;
  }, [volum, audio]);

  const handlePlayPause = () => {
    if (play) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlay(!play);
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);

    if (audio.duration) {
      audio.currentTime = (newValue * (audio.duration || 0)) / 100;
    }
  };

  const toggleLoop = () => {
    setLoop(!loop);
  };

  return (
    <Layout>
      <div className="flex justify-center items-center  lg:w-[480px] h-[690px] text-white mx-20 lg:mx-[160px]  md:my-[100px] w-full md:p-0 p-8">
        <div className=" w-full ">
          <h1 className="text-4xl">{data?.name ?? "No Song"}</h1>
          <p className="text-lg text-[#ffffffa2]">
            {data?.artist ?? "No Song"}
          </p>
          <div className=" flex justify-center">

          <img
            src={coverImage}
            alt={data?.name}
            className="w-[480px] md:h-[480px] h-72  rounded-lg"
            />
            </div>

          <div className="w-full relative h-1 rounded-full cursor-pointer mt-6 bg-[#FFFFFF14]">
            <input
              type="range"
              min={0}
              max={100}
              className="w-full h-1 absolute top-0"
              value={isNaN(value) ? 0 : value}
              onChange={handleChanges}
            />
            <div className="bg-white h-1" style={{ width: `${value}%` }}></div>

            <span className="absolute left-0">{timer(currentDuration)}</span>
            <span className="absolute right-0">{timer(duration)}</span>
          </div>

          <div className="flex justify-between mt-8">
            <button
              className="w-[48px] h-[48px] rounded-full bg-[#FFFFFF1A] flex justify-center items-center text-2xl"
              onClick={toggleLoop}
              title={loop ? "End Loop" : "Start Loop"}
            >
              <HiOutlineDotsHorizontal />
            </button>
            <div className="flex items-center justify-between gap-8">
              <button className="text-2xl " onClick={() => handleChange?.(currentIndex - 1)}>
                <Backward />
              </button>
              <button
                className="w-[48px] h-[48px] rounded-full bg-white flex justify-center items-center text-2xl text-black"
                onClick={handlePlayPause}
              >
                {play ? <FaPause /> : <FaPlay />}
              </button>
              <button className="text-2xl " onClick={() => handleChange?.(currentIndex + 1)}>
                <Forward />
              </button>
            </div>
            <button
              className="w-[48px] h-[48px] rounded-full bg-[#FFFFFF1A] flex justify-center items-center text-2xl"
              onClick={() => setVolum(!volum)}
            >
              {volum ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>

            <audio src={data?.url} hidden loop={loop} ref={audioRef} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SongPayer;
