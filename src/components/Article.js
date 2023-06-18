import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Article({
  flags,
  name,
  population,
  region,
  subregion,
}) {

  const [temp, setTemp] = useState(null);



  async function getTemp() {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${name.common}`

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2ad8f22d62mshed27fd7275e6797p1e974ajsnd785817b008c',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      const result = await(await fetch(url, options)).json();

      setTemp(result.current.temp_c)

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Link to={`/${name.common}`}>
        <article onMouseEnter={getTemp} onMouseLeave={()=>setTemp(null)} className="bg-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 rounded-lg shadow overflow-hidden relative">
          <img src={flags.svg} alt="" className="md:h-72 w-full object-cover" />
          <div className="p-4">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              {name.common}
            </h2>
            <ul className="flex flex-col items-start justify-start gap-2 dark:text-gray-400">
              <li>Population: {population.toLocaleString()}</li>
              <li>Region: {region}</li>
              <li>Subregion: {subregion}</li>
            </ul>
          </div>

          { temp ? (
            <div className="p-4 flex-col text-center absolute inset-0 text-black text-xl flex items-center justify-center" style={{backgroundImage: "linear-gradient(to bottom right, #FF61D2, #FE9090)"}}>
                <p>Temperature at {name.common}: {temp}°C</p>
                <br />
                <p className="text-white">click to Know more!</p>
            </div>
          ) : null}
        </article>
      </Link>
    </>
  );
}
