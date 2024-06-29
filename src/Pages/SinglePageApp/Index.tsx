import React, { useEffect, useState } from "react";
import Logo from "./Child1/Logo";
import List from "./Child2/List";
import SongPayer from "./Child3/SongPayer";
import { Song } from "@/Constant/Interface";
import { SONG_LIST_FETCH } from "@/Service/Api";
import Loader from "@/Components/Atoms/Loader";
import { useTexts } from "@/Constant/Texts";

const HomePage = () => {
  const [forYou, setForYou] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [filterData, setFilterData] = useState<Song[]>([]);
  const [value, setValue] = useState<number>(0);
  const texts = useTexts();
  const [seletedData, setSeletedData] = useState<Song | undefined>();
  

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await SONG_LIST_FETCH();
      setForYou(data.data || []);
      setSeletedData(data.data[0]);

      setIsLoading(false);
      setFilterData(data.data);
    } catch (error) {
      console.log("Error in fetchData:", error);
      setError(error as Error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (forYou[value]) {
      setSeletedData(forYou[value]);
    }
  }, [value, forYou]);

  const handleChange = (index: number) => {
    console.log(index)
    if (index > 0 && index < forYou.length) {
      setValue(index);
    } else {
      console.log("Index out of bounds");
    }
  };

  const handleClick = (info: Song) => {
    const index = filterData.findIndex((song) => song.id === info.id);
    setValue(index);
    setSeletedData(info);
  };

  console.log(value);

  if (isLoading) {
    return <Loader className="text-xl font-medium text-typography-dark-grey" />;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const handleNav = (value: string) => {
    setValue(0);

    if (value == texts.TopTracks) {
      const data = forYou.filter((val) => val.top_track);
      setFilterData(data);
    } else {
      setFilterData(forYou);
    }
  };


  return (
    <div className="w-full h-screen flex lg:gap-4 gap-0">
      <Logo />
      <List data={filterData} handleNav={handleNav} onClick={handleClick} index={value}/>
      <SongPayer data={seletedData} handleChange={handleChange} currentIndex={value}/>
    </div>
  );
};

export default HomePage;
