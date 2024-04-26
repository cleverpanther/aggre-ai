"use client";
import CardWithImage from "@/components/card-with-image";
import Header from "@/components/main/header";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import SuggestionCard from "@/components/suggestion-card/suggestion-card";
import React, { useCallback, useState } from "react";
import TextAI from "./pages/text";
import ImageAI from "./pages/image";
import AudioAI from "./pages/audio";
import VideoAI from "./pages/video";
import ThreeDImageAI from "./pages/three";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [cardType, setCardType] = useState("");
  const onCardButtonClick = useCallback((cardType: string) => {
    setCardType(cardType);
  }, []);

  const onNewChatButtonClick = useCallback(() => {
    setCardType("");
  }, []);

  return (
    <div className="flex ">
      <div className="w-[25%] relative hidden md:block">
        <Sidebar setCardType={setCardType} onClick={() => onNewChatButtonClick()} />
      </div>

      <div className="w-full">
        <Navbar setCardType={setCardType} cardType={cardType} />
        {cardType == "" && (
          <>
            <Header />
            <div className="flex flex-col gap-1 ml-6 mt-10">
              <h1 className="text-2xl">What do you need?</h1>
              <p className="text-gray-500 w-[90%] md:w-[auto]">
                All services are available and you can use with your current
                account!
              </p>

              <div className="flex flex-wrap mt-6 md:ml-0 ml-4">
                <CardWithImage
                  cardName="Text AI"
                  cardImage="/images/pic1.png"
                  onClick={() => onCardButtonClick("TextAI")}
                />
                <CardWithImage
                  cardName="Image AI"
                  cardImage="/images/pic2.png"
                  onClick={() => onCardButtonClick("ImageAI")}
                />
                <CardWithImage
                  cardName="Voice AI"
                  cardImage="/images/pic3.png"
                  onClick={() => onCardButtonClick("AudioAI")}
                />
                <CardWithImage
                  cardName="Video AI"
                  cardImage="/images/pic4.png"
                  onClick={() => onCardButtonClick("VideoAI")}
                />
                <CardWithImage
                  cardName="3D AI"
                  cardImage="/images/pic5.gif"
                  onClick={() => onCardButtonClick("ThreeDImageAI")}
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <SuggestionCard />
            </div>
          </>
        )}
        {cardType == "TextAI" && <TextAI />}
        {cardType == "ImageAI" && <ImageAI />}
        {cardType == "AudioAI" && <AudioAI />}
        {cardType == "VideoAI" && <VideoAI />}
        {cardType == "ThreeDImageAI" && <ThreeDImageAI />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
