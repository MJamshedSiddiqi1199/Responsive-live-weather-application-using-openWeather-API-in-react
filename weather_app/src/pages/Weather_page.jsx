import { useState } from "react";
import bg_cloud from "../assets/bg_cloud.jpg";
import Search from "../components/Search";
import Weather_info from "../components/Weather_info";

const Weather_page = () => {
  const [city, setCity] = useState(""); // State to hold the city name

  const handleSearch = (cityName) => {
    setCity(cityName); // Update the city name
  };

  return (
    <div className="text-center flex">
      <div
        className="h-screen bg-cover w-screen md:overflow-hidden "
        style={{
          backgroundImage: `url(${bg_cloud})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minWidth: "100vw",
          minHeight: "100vh",
        }}
      >
        <div className="-scroll-mt-36">
          <Search onSearch={handleSearch} /> {/* Pass search handler */}
        </div>
        <div>
          <Weather_info city={city} /> {/* Pass city to Weather_info */}
        </div>
      </div>
    </div>
  );
};

export default Weather_page;
