import InputBox from "@/Components/ui/Input";
import Item from "@/Components/ui/Item";
import { Song } from "@/Constant/Interface";
import { useTexts } from "@/Constant/Texts";
import Layout from "@/Pages/Layout/Layout";
import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";

interface ListProps {
  data: Song[];
  handleNav?: (value: string) => void;
  onClick?: (data: Song) => void;
  index: number;
}

const List = ({ data, handleNav, onClick, index }: ListProps) => {
  const texts = useTexts();
  const [active, setActive] = useState<string>(texts.ForYour);
  const [filteredData, setFilteredData] = useState<Song[]>(data);
  const [menu, setMenu] = useState(true);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleClick = (value: string) => {
    setActive(value);
    if (handleNav) {
      handleNav(value);
    }
  };

  const handleSearch = (value: string) => {
    const filteredSongs = data.filter(
      (song) =>
        song.name && song.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredData(filteredSongs);
  };

  return (
    <Layout>
      <div className={`overflow-y-auto h-full  `}>
        <div
          className="bg-white absolute top-4 rounded  left-4 block lg:hidden"
          onClick={() => setMenu(false)}
        >
          <IoMenu />
        </div>

        <div
          className={`lg:w-[432px]   h-[95vh] text-[#ffffff6b] mt-10 w-full ${
            menu
              ? "hidden "
              : "block absolute bg-[#201606] z-20 mt-3 w-[100vw] h-full"
          } lg:block`}
        >
          <div
            className="bg-white w-4 h-4 text-black  rounded mt-1 ml-4 block lg:hidden"
            onClick={() => setMenu(!menu)}
          >
            <IoMenu />
          </div>
          <div className="flex  items-center gap-10 font-bold px-4  ">
            <h2
              className={`cursor-pointer text-lg  lg:text-4xl ${
                active === texts.ForYour ? "text-white" : ""
              }`}
              onClick={() => handleClick(texts.ForYour)}
            >
              {texts.ForYour}
            </h2>
            <h2
              onClick={() => handleClick(texts.TopTracks)}
              className={`cursor-pointer text-lg lg:text-4xl ${
                active === texts.TopTracks ? "text-white" : ""
              }`}
            >
              {texts.TopTracks}
            </h2>
          </div>
          <div>
            <InputBox className="mt-8 mx-4" onChange={handleSearch} />
            <div className="mt-4">
              {filteredData?.map((data) => (
                <div
                  key={data.id}
                  className={`${data.id === index + 1 ? "bg-[#FFFFFF14]" : ""}`}
                >
                  <Item className="p-2" data={data} onClick={onClick} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default List;
