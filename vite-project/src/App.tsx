import { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Homepage from './pages/homepage';
import Details from './components/details';
import './App.css';

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

interface AppState {
  astdet: any[]; // Update the type accordingly based on the actual data structure
}

class App extends Component<{}, AppState> {
  private API_KEY: string = "0XDOT0Q9cPCQSjqR3q8gYbxzLyCXa9F7xH56jDsM";
  private asteroidIDs: number[] = [];

  constructor(props: {}) {
    super(props);
    this.state = {
      astdet: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  handleSearch = (text: string) => {
    console.log(text);


    if (this.asteroidIDs.includes(text)) {
      window.location.href = `/${text}`;
    } else {
      if (text.length === 0) {
        toast.error("Enter Asteroid ID");
      } else {
        toast.error("Asteroid ID is invalid");
      }
    }
  }

  handleRandom = () => {
    const x = Math.floor(Math.random() * 20);
    window.location.href = `/${this.asteroidIDs[x]}`;
  }

  fetchData = async () => {
    const res = await fetch("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" + this.API_KEY);
    const data = await res.json();

    if (data.near_earth_objects) {
      this.setState({ astdet: data.near_earth_objects });
    }
  }

  render() {
    const detailjson: Detailjson[] = this.state.astdet.map((item: any) => ({
      asteroidID: item.id,
      name: item.name,
      designation: item.designation,
      estimateddia: {
        min_km: item.estimated_diameter.kilometers.estimated_diameter_min,
        max_km: item.estimated_diameter.kilometers.estimated_diameter_max
      },
      hazardous: item.is_potentially_hazardous_asteroid,
      orbitdata: {
        orbit_id: item.orbital_data.orbit_id,
        first_date: item.orbital_data.first_observation_date,
        last_date: item.orbital_data.last_observation_date,
        equinox: item.orbital_data.equinox
      },
      sentryobject: item.is_sentry_object
    }));

    this.asteroidIDs = detailjson.map((item) => item.asteroidID);

    return (
      <Router>
        <Toaster
          position="top-center"
          reverseOrder={true}
        />
        <Routes>
          <Route path="/" element={<Homepage onSearch={this.handleSearch} onRandom={this.handleRandom} />} />
          <Route path="/:id" element={<Details detailData={detailjson} />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
