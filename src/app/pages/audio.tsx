import React, { useCallback, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ELEVENLABSURL } from "../../config/api";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabase";
import Loader from "@/components/Loader";

interface Chat {
  type: string;
  content: string;
}

const AudioAI = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [audioHistory, setAudioHistory] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);

  const getContent = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
  
    const userQuery = { type: "question", content: searchQuery };
    setAudioHistory(prev => [...prev, userQuery]);

    const data = await textToSpeech();
    if (data) {
      const blob = new Blob([data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      const { error } = await supabase
        .from('chat_activities')
        .insert({
          title: "Audio Inquiry",
          iconpath: "/path/to/audio-icon.svg",
          time: new Date().toISOString(),
          description: searchQuery
        });
      console.log(error);

      setAudioHistory(prev => [...prev, {
        type: "answer",
        content: url,
      }]);
    } else {
      setLoading(false);
    }
    setLoading(false);
  };

  const textToSpeech = async () => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_KEY;
      const speechDetails = await axios.request({
        method: "POST",
        url: ELEVENLABSURL,
        headers: {
          accept: "audio/mpeg",
          "content-type": "application/json",
          "xi-api-key": `${API_KEY}`,
        },
        data: {
          text: searchQuery,
        },
        responseType: "arraybuffer",
      });
      return speechDetails.data;
    } catch (error) {
      console.log(error)
      let err = "Unusual activity detected. Free Tier usage disabled. If you are using proxy/VPN you might need to purchase a Paid Plan to not trigger our abuse detectors. Free Tier only works if users do not abuse it, for example by creating multiple free accounts. If we notice that many people try to abuse it, we will need to reconsider Free Tier altogether. Please play fair.\nPlease purchase any Paid Subscription to continue.";
      toast.error(err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="w-full pt-4">
      {
        audioHistory.length > 0 ? (
          audioHistory.map((item, key) => (
            <div
              key={key}
              className={`ml-4 md:ml-16 ${
                key === audioHistory.length - 1 ? "pb-20" : ""
              }`}
            >
              <div className="flex items-center">
                <Image
                  className="text-left mb-4 mt-4 pr-4"
                  src={item.type == "question" ? "/me.png" : "/agai.png"}
                  height={30}
                  width={30}
                  alt=""
                />
                {item.type == "question" ? "Me" : "Agai"}
              </div>
              {
                item.type == "question" ? (
                  <p className="text-[16px] text-justify pr-8  mb-4 pl-8">
                    {item.content}
                  </p>
                ) 
                  : 
                (
                  <audio className="pl-8" autoPlay controls>
                    <source src={item.content} type="audio/mpeg" />
                  </audio>
                )
              }
              {
                loading && key === audioHistory.length - 1 && ( <Loader /> )
              }
            </div>
          )
        )
      ) : (
        <div>
          <Image
            className="m-auto mt-32"
            src={"/logo.svg"}
            height={200}
            width={200}
            alt=""
          />
          <h2 className="text-center text-2xl">How can we help you?</h2>
        </div>
      )}
      <div
        className={` md:max-w-[60%] ml-[2%] md:ml-[10%]  m-x-auto flex search-btn text-left fixed bottom-5 w-[96%] md:w-3/4`}
      >
        <input
          className="inline-block md:p-[14px] bg-transparent text-[14px] search-txt w-full"
          type="text"
          name="text"
          placeholder="What are you looking for?"
          onChange={(e: any) => setSearchQuery(e.target.value)}
          disabled={loading}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !loading) {
              getContent();
            }
          }}
        />
        <div className="inline-block float-right cursor-pointer">
          {loading ? (
            <button className="send-btn">Loading ...</button>
          ) : (
            <button
              className="send-btn flex items-center p-[15px]"
              onClick={() => getContent()}
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.5698 8.50989L10.0098 4.22989C4.25978 1.34989 1.89978 3.70989 4.77978 9.45989L5.64978 11.1999C5.89978 11.7099 5.89978 12.2999 5.64978 12.8099L4.77978 14.5399C1.89978 20.2899 4.24978 22.6499 10.0098 19.7699L18.5698 15.4899C22.4098 13.5699 22.4098 10.4299 18.5698 8.50989ZM15.3398 12.7499H9.93977C9.52978 12.7499 9.18977 12.4099 9.18977 11.9999C9.18977 11.5899 9.52978 11.2499 9.93977 11.2499H15.3398C15.7498 11.2499 16.0898 11.5899 16.0898 11.9999C16.0898 12.4099 15.7498 12.7499 15.3398 12.7499Z"
                  fill="white"
                />
              </svg>
              {!loading ? "Send" : "Loading..."}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioAI;
