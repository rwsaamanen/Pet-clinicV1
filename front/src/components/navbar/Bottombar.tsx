import { Link } from "react-router-dom";
import homeIcon from "../../assets/home.png";
import petsIcon from "../../assets/pets.png";
import Visit from "../../assets/visit.png";

const bottomBarLinks = [
    { label: "Home", route: "/dashboard", imgURL: homeIcon },
    { label: "All Pets", route: "/dashboard/all-pets", imgURL: petsIcon },
    { label: "Test", route: "/dashboard/visit", imgURL: Visit },
];

const BottomBar = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 border-b border-gray-300 bg-cyan-50 backdrop-blur-sm transition-all bg-opacity-10 border-t flex justify-around items-center h-12">
            {bottomBarLinks.map((link) => (
                <Link to={link.route} key={link.label} className="flex flex-col items-center">
                    <img src={link.imgURL} alt={link.label} width={24} height={24} />
                </Link>
            ))}
        </div>
    );
};

export default BottomBar;
