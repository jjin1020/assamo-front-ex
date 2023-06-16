import Footer from "../footer";
import Nav from "../nav";

export default function AreaLayout({ children }) {

    return (
        <div className="bg-primary">
            <Nav/>
            <div>{children}</div>
            <Footer/>
        </div>
    )
}