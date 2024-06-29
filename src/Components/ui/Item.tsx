import { Song } from "@/Constant/Interface";
import { IMAGE_DATA } from "@/Service/Api";
import { formatDuration } from "@/Utils/Helper";
import React, { useEffect, useState } from "react";

interface ItemProps {
  className?: string;
  data?: Song;
  onClick?: (data: Song) => void;
  current?: Song | null;
}

const Item: React.FC<ItemProps> = ({ className, data, onClick, current }) => {
  const [audioDuration, setAudioDuration] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");

  useEffect(() => {
    if (data?.url) {
      fetchAudioDuration(data.url);
    }
    if (data?.cover) {
      fetchCover(data.cover);
    }
  }, [data]);

  const fetchCover = async (coverUrl: string) => {
    try {
      const imageUrl = await IMAGE_DATA(coverUrl);
      setCoverImage(imageUrl);
    } catch (error) {
      console.log("Error fetching cover:", error);
      setCoverImage("");
    }
  };

  const fetchAudioDuration = (url: string) => {
    const audio = new Audio(url);
    audio.addEventListener("loadedmetadata", () => {
      const duration = formatDuration(audio.duration);
      setAudioDuration(duration);
    });
  };

  const handleClick = () => {
    if (onClick && data) {
      onClick(data);
    }
  };

  return (
    <div
      className={`flex justify-between  ${
        current?.id === data?.id ? "bg-[#FFFFFF14]" : ""
      } hover:bg-[#FFFFFF14]   rounded-lg cursor-pointer items-center  ${className}`}
      onClick={handleClick}
    >
      <div className="flex gap-4">
        <img
          src={coverImage}
          alt="Profile"
          className="w-12 h-12 bg-gray-300 rounded-full"
        />
        <div>
          <h2 className="text-lg text-white">{data?.name}</h2>
          <p className="text-[#ffffffa2] text-sm">{data?.artist}</p>
        </div>
      </div>
      <p className="text-[#ffffff5b]">{audioDuration}</p>
    </div>
  );
};

export default Item;
