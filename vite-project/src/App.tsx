import { useEffect, useState } from 'react';
import './App.css'
import Homepage from './pages/homepage'
import Details from './components/details';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export interface EstimatedDiameter {
  min_km: number;
  max_km: number;
}

export interface OrbitalData {
  orbit_id: number;
  first_date: string; 
  last_date: string; 
  equinox: string; 
}

export interface Detailjson {
  asteroidID: number;
  name: string;
  designation: number;
  estimateddia: EstimatedDiameter;
  hazardous: boolean;
  orbitdata: OrbitalData;
  sentryobject: boolean;
}

function App() {
  const [astdet, setastdet] = useState<any[]>([]);
  const API_KEY = "0XDOT0Q9cPCQSjqR3q8gYbxzLyCXa9F7xH56jDsM";
  // const navigate = useNavigate();

  useEffect(() => {fetchData();}, []);

  const handleSearch = (text: string) => {
    console.log(text);

    if (asteroidIDs.includes(text)){
    window.location.href = `/${text}`;
    // navigate(`/${text}`)
    }

    else {
      if(text.length == 0){
        toast.error("Enter Asteroid ID")
      }
      else{toast.error("Asteroid ID is invalid")} 
    }
  }

  const handleRandom = () => {
    const x: number = Math.floor(Math.random() * 20);
    // console.log(asteroidIDs[x]);
    window.location.href = `/${asteroidIDs[x]}`;
  }

  const fetchData = async() => {
    const res = await fetch("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key="+API_KEY);
    const data = await res.json();

  if (data.near_earth_objects){
    setastdet(data.near_earth_objects)
  }
  }

  const detailjson: Detailjson[] = astdet.map((item) => ({
    asteroidID: item.id,
    name: item.name,
    designation: item.designation,
    estimateddia: {min_km: item.estimated_diameter.kilometers.estimated_diameter_min,
                  max_km: item.estimated_diameter.kilometers.estimated_diameter_max},
    hazardous: item.is_potentially_hazardous_asteroid,
    orbitdata: {
      orbit_id:item.orbital_data.orbit_id,
      first_date:item.orbital_data.first_observation_date,
      last_date:item.orbital_data.last_observation_date,
      equinox:item.orbital_data.equinox},
    sentryobject: item.is_sentry_object
  }));

  const asteroidIDs: number[] = detailjson.map((item) => item.asteroidID);

  // console.log(asteroidIDs);

  return (
    <Router>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <Routes>
        <Route path="/" element = {<Homepage onSearch={handleSearch} onRandom={handleRandom}/>}/>
        <Route path="/:id" element={<Details detailData={detailjson}/>} /> 
      </Routes>
    </Router>
  )
}

export default App
