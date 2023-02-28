import { useEffect, useRef } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";
import artplayerPluginControl from "artplayer-plugin-control";
import "./player.scss";

export default function Player({ option, videoUrl, getInstance, ...rest }) {
    const artRef = useRef();

    console.log("videoUrl in child:", videoUrl);

    useEffect(() => {
        function playM3u8(video, url, art) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);

                art.hls = hls;
                art.once("url", () => hls.destroy());
                art.once("destroy", () => hls.destroy());
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = url;
            } else {
                art.notice.show = "Unsupported playback format: m3u8";
            }
        }

        let vidSource =
            videoUrl &&
            videoUrl.find(
                (sources) =>
                    sources.quality === "auto" ||
                    sources.quality === "backup" ||
                    sources.quality === "default"
            )?.url;

        var art = new Artplayer({
            ...option,
            container: artRef.current,

            url: vidSource,
            type: "m3u8",
            customType: {
                m3u8: playM3u8,
            },
            plugins: [
                artplayerPluginHlsQuality({
                    control: true,
                    setting: true,
                    getResolution: (level) => level.height + "P",
                    title: "Quality",
                    auto: "Auto",
                }),
            ],
        });

        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
        };
    }, [videoUrl]);

    return <div ref={artRef} {...rest}></div>;
}
