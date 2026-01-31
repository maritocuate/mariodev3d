import { Html } from "@react-three/drei"

function Loader() {

    return (
        <Html center>
            <div className="loader-container">
                <img
                    src="/skeleton.png"
                    alt="Loading..."
                    className="skeleton-image"
                />
            </div>
        </Html>
    )
}

export default Loader
