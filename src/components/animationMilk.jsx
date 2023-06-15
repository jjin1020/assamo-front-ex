import { Controls, Player } from "@lottiefiles/react-lottie-player";

export default function AnimationMilk() {

    return (
            <Player
            autoplay
            loop
            src='/animation-milk.json'
            style={{ height: '80px', width: '80px' }}
            >
            </Player>
    )
}