import { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';
import Homepage from './pages/homepage';
import Details from './components/details';
import './App.css';

class App extends Component<{} > {
   render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/:id" element={<Details/>} />
        </Routes>
      </Router>
  
    );
  }
}

export default App;
