
import React, { useEffect, useState } from "react";
import "./MainaboutUs.css";
import About_us_shimmer from "../Shimmer_card/About_us_shimmer";

interface AboutUsItem {
  title: string;
  description: string;
  numericValue: string;
}

const MainaboutUs: React.FC = () => {
  const [data, setData] = useState<AboutUsItem[]>([]);
  const [show_shimmer,set_shimmer]=useState<boolean>(true)

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const res = await fetch("https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/home/about-us");
        
        const json = await res.json();
        setData(json.content || []);
        set_shimmer(false)
      } catch (error) {
        console.error("Failed to fetch About Us data", error);
      }
    };

    fetchAboutUs();
  }, []);

  return (
    <>
    {
      !show_shimmer ? <div className='container-main-page-aboutUs'>
      <div className='main-page-1'>
        <p>(ABOUT US)</p>
      </div>

      <div className='main-page-2'>
        <div>
          {data.slice(0, 2).map((item, index) => (
            <div key={index} className='info' id='margin-b'>
              <p className="info-year">{item.title}</p>
              <p className="info-number">{item.numericValue}</p>
              <p className="info-text">{item.description}</p>
            </div>
          ))}
        </div>

        <div>
          {data.slice(2, 4).map((item, index) => (
            <div key={index + 2} className='info' id='margin-b'>
              <p className="info-year">{item.title}</p>
              <p className="info-number">{item.numericValue}</p>
              <p className="info-text">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div> : <About_us_shimmer/>
    }
    
     </>
  );
};

export default MainaboutUs;
