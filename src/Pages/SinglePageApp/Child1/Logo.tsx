import Layout from "@/Pages/Layout/Layout";
import { Spotify } from "@/assets/SVG/Index";
import React from "react";

const Logo = () => {
  return (
    <Layout>
      <div className="lg:flex flex-col justify-between items-start  hidden text-white   h-full  w-[280px] ">
        <Spotify w="200" h="100" />
        <div className=" mb-[32px] ml-[32px] bg-[#151515] rounded-full hidden lg:block">
          <img
            src="https://s3-alpha-sig.figma.com/img/4b1c/9272/23674d7d0fc7e5938c32787f13738353?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PtRRqCWcpPxH~HmQr8zozK0mBohhTGbx~cxlJyUDBkLA~a9KmBtSLWQLbvdNvaBk7lzIZIFoI2FIjmdOlo09dl8~FIdSUpERnN5rIeJxWRJ-ovL9aN9BmKjME5SxyYg1JwNGMKLH~t-peM8yCYDbwvGt93AMm-feDeEf79E02cc-j8ZrwfikXGNaXsV3hVQt8nKJZa57skMJ5gLmlQgGXwa9SyCuNDnBwuydeKiRMWxhXgntJcribzeygvWBpqv1xuT94p-KKmwQ1mqfqtS36OmqyiLzxloa35hrHLjXepGOMKoHnNj-yOurUxuZXiVoWL2zxprv2FdUEOHG1BvmQA__"
            alt="User profile"
            className="w-[48px] h-[48px] rounded-full object-cover"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Logo;
