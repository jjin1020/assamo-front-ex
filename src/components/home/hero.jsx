import Animation from "../animation";

export default function Hero() {

    return (
        <>
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">안녕하세요.
                    <br className="hidden lg:inline-block" />오늘도 우유를 찾아주셔서 감사합니다.
                </h1>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <Animation></Animation>
            </div>
        </>
    )
}