import React from 'react';
import { useParams } from 'react-router-dom';
import { Detailjson } from '../App';
import { Background } from '../pages/homepage';

interface DetailProps {
  detailData: Detailjson[];
}

const Details: React.FC<DetailProps> = ({ detailData }) => {
  const { id } = useParams();
  const index = detailData.findIndex((item) => item.asteroidID === id);

  if (index !== -1) {
    const asteroid = detailData[index];

    return (
      <div>
        <Background>
        <h3>ID: {asteroid.asteroidID}</h3>
        <p>Name: {asteroid.name}</p>
        <p>Designation: {asteroid.designation}</p>
        <p>Estimated Diameter: {asteroid.estimateddia.min_km} km - {asteroid.estimateddia.max_km} km</p>
        <p>Hazardous: {asteroid.hazardous ? 'Yes' : 'No'}</p>
        <p>Orbit ID: {asteroid.orbitdata.orbit_id}</p>
        <p>First Observation Date: {asteroid.orbitdata.first_date}</p>
        <p>Last Observation Date: {asteroid.orbitdata.last_date}</p>
        <p>Equinox: {asteroid.orbitdata.equinox}</p>
        <p>Sentry Object: {asteroid.sentryobject ? 'Yes' : 'No'}</p>
      </Background>
      </div>
    );
  } else {
    return <div>ID {id} not found in detailData</div>;
  }
};

export default Details;
