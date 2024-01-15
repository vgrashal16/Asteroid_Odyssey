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

interface AstDet {
  id: number;
  name: string;
  designation: string;
  estimated_diameter?: EstimatedDiameter;
  is_potentially_hazardous_asteroid: boolean;
  orbital_data?: OrbitalData;
  is_sentry_object: boolean;
}

interface AppState {
  astdet: AstDet[]; 
  
}


class App extends Component<{}, AppState > {
  private API_KEY: string = "0XDOT0Q9cPCQSjqR3q8gYbxzLyCXa9F7xH56jDsM";
  private asteroidIDs: number[] = [];

  constructor(props: {}) {
    super(props);
    this.state = {
      astdet: [],
    };
  }

  // componentDidMount() {
  //   this.fetchData();
  // }

  // handleSearch = (text: any) => {
  //   // console.log(text);
  //   if (this.asteroidIDs.includes(text)) {
  //     window.location.href = `${text}`;
  //   } else {
  //     if (text.length === 0) {
  //       toast.error("Enter Asteroid ID");
  //     } else {
  //       toast.error("Asteroid ID is invalid");
  //     }
  //   }
  // }

  handleSearch = async (searchID: any) => {
    try{
      const data = await this.fetchData(searchID);
      console.log(data);
      
      // if (this.state.astdet){
        // }
      }
    catch{
        toast.error("Asteroid ID is invalid");
      }
    finally {
      window.location.href = `/${searchID}`;
    }
  }
  
  // handleSearch = async (searchID: any) => {
  //   try {
  //     const data = await this.fetchData(searchID);
  //     if (data) {
  //       window.location.href = `/${searchID}`;
  //     } else {
  //       toast.error("Asteroid ID is invalid");
  //     }
  //   } catch {
  //     toast.error("Error fetching data");
  //   }
  // }
  
  handleRandom = () => {
    const x = Math.floor(Math.random() * 20);
    window.location.href = `${this.asteroidIDs[x]}`;
  }
  
  // fetchData = async () => {
    //   const res = await fetch("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" + this.API_KEY);
    //   const data = await res.json();
    
    //   if (data.near_earth_objects) {
      //     this.setState({ astdet: data.near_earth_objects });
      //   }
      // }
    
    fetchData = async (asteroidId: string) => {
      const res = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=` + this.API_KEY);
      const data = await res.json();
      // console.log(data.id);
      if (data) {
        this.setState({ astdet: data });
      }
      return data;
    }

    // fetchData = async (asteroidId: string) => {
    //   try {
    //     const res = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=` + this.API_KEY);
    //     const data = await res.json();
    //     return data;
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //     return null;
    //   }
    // }

      
  render() {
    // console.log(this.state.astdet.id);
    // astdet2.map((item: any)=> {console.log(item);});

    // const detailjson: Detailjson[] = this.state.astdet.map((item: any) => ({
    //   asteroidID: item.id,
    //   name: item.name,
    //   designation: item.designation,
    //   estimateddia: {
    //     min_km: item.estimated_diameter.kilometers.estimated_diameter_min,
    //     max_km: item.estimated_diameter.kilometers.estimated_diameter_max
    //   },
    //   hazardous: item.is_potentially_hazardous_asteroid,
    //   orbitdata: {
    //     orbit_id: item.orbital_data.orbit_id,
    //     first_date: item.orbital_data.first_observation_date,
    //     last_date: item.orbital_data.last_observation_date,
    //     equinox: item.orbital_data.equinox
    //   },
    //   sentryobject: item.is_sentry_object
    // }));
    // const astdet2 = this.state.astdet[0];

    // const detailjson = {};
    // console.log(this.state.astdet.estimated_diameter?.kilometers);

    const detailjson: Detailjson = {
      asteroidID: this.state.astdet.id,
      name: this.state.astdet.name,
      designation: this.state.astdet.designation,
      estimateddia: {
        min_km: this.state.astdet.estimated_diameter?.kilometers?.estimated_diameter_min,
        max_km: this.state.astdet.estimated_diameter?.kilometers?.estimated_diameter_max
      },
      hazardous: this.state.astdet.is_potentially_hazardous_asteroid,
      orbitdata: {
        orbit_id: this.state.astdet.orbital_data?.orbit_id,
        first_date: this.state.astdet.orbital_data?.first_observation_date,
        last_date: this.state.astdet.orbital_data?.last_observation_date,
        equinox: this.state.astdet.orbital_data?.equinox
      },
      sentryobject: this.state.astdet.is_sentry_object
    };




    
    // console.log(detailjson);
    // this.asteroidIDs = detailjson.map((item) => item.asteroidID);

    console.log(detailjson);

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
