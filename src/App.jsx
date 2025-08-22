import { useState, useEffect } from "react";

import "./App.css";
import axios from "axios";

function App() {
  const [poka, setPoka] = useState({});
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`
        );
        console.log(response.data);
        setPoka(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [number]);

  const handlePrev = () => {
    if (number <= 1) return;
    setNumber((prev) => prev - 1);
  };
  const handleNext = () => {
    setNumber((prev) => prev + 1);
  };

  const addFav = () => {
    setFav((prev) => [...prev, poka]);
  };

  console.log(fav);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">{poka.name}</h1>
      <div className="flex justify-center items-center">
        <img
          src={poka.sprites?.other.dream_world.front_default}
          alt={poka.name}
          className="w-48 h-48"
        />
      </div>

      <div className="my-5">
        <button
          type="button"
          onClick={handlePrev}
          className="bg-blue-500 text-white px-4 py-2 rounded me-3"
        >
          ย้อนกลับ
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          ถัดไป
        </button>
      </div>

      <button
        type="button"
        onClick={addFav}
        className="bg-blue-500 text-white px-4 py-2 rounded "
      >
        ชอบ
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {fav.map((item, idx) => (
          <div key={idx}>
            <h2>{item.name}</h2>
            <img
              src={item.sprites?.other.dream_world.front_default}
              alt={item.name}
              className="w-48 h-48"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
