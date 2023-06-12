import { Controls, Player } from "@lottiefiles/react-lottie-player";

export default function Animation() {

    return (
            <Player
            autoplay
            loop
            src='/animation.json'
            style={{ height: '300px', width: '300px' }}
            >
            </Player>
    )
}