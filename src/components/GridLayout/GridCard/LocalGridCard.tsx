import React, { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { BasicIcons } from "@/assets/BasicIcons";
import useStore from "@/store/slices";
import {
  useDataMessage,
  useLocalPeer,
  useLocalVideo,
  useLocalScreenShare,
} from "@huddle01/react/hooks";

const LocalGridCard: FC = () => {
  const [reaction, setReaction] = useState("");
  const { enableVideo, isVideoOn, stream, disableVideo } = useLocalVideo();
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    metadata,
    peerId: localPeerId,
    role,
  } = useLocalPeer<{
    displayName: string;
    avatarUrl: string;
    isHandRaised: boolean;
  }>();

  const {
    shareStream,
    startScreenShare,
    stopScreenShare,
    audioTrack,
    videoTrack,
  } = useLocalScreenShare({
    onProduceStart: (producer) => {
      console.log("Started screen share!");
      console.log(producer);
      // your code here
    },
    onProduceClose: () => {
      console.log("Stopped screen share!");
      // your code here
    },
    onProduceError: () => {
      console.log("There was an error in sharing your screen!");
      // your code here
    },
  });

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div
      className={`flex h-full justify-between rounded-xl text-white p-6 ${
        role && ["host", "coHost", "speaker"].includes(role) ? "pb-6" : ""
      }`}
    >
      {(!stream || !shareStream) && (
        <div className="relative flex flex-col mx-10">
          <Image
            src={metadata?.avatarUrl || "/avatar/avatar/0.png"}
            alt="default-avatar"
            width={100}
            height={100}
            quality={100}
            priority
            className="maskAvatar"
          />

          <div className="mt-1 text-center">
            <div className="text-gray-700 text-base font-medium">
              {`${metadata?.displayName} (You)`}
            </div>
            <div className="text-gray-500 text-sm font-normal">{role}</div>
          </div>

          <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 mb-2 text-4xl">
            {reaction}
          </div>

          {role && ["host", "coHost", "speaker"].includes(role) && (
            <div className="absolute right-0">{BasicIcons.audio}</div>
          )}

          {metadata?.isHandRaised && (
            <div className="absolute flex right-2 w-8 h-8 -top-1 rounded-full justify-center items-center bg-custom-8 text-xl border-custom-1 border-2">
              ✋
            </div>
          )}
        </div>
      )}

      {shareStream ? (
        <div className="grid grid-cols-2 gap-4 mt-2">
          {stream && (
            <div className="col-span-1">
              <video
                ref={videoRef}
                className="aspect-video rounded-xl h-48 w-full"
                autoPlay
                muted
              />
            </div>
          )}

          <div className={stream ? "col-span-1" : "col-span-2"}>
            <video
              className="aspect-video rounded-xl h-48 w-full"
              ref={(screenShareRef) =>
                screenShareRef && (screenShareRef.srcObject = shareStream)
              }
              autoPlay
              muted
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 mt-2">
          {stream && (
            <div className="col-span-2">
              <video
                ref={videoRef}
                className="aspect-video rounded-xl h-48 w-full"
                autoPlay
                muted
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(LocalGridCard);
