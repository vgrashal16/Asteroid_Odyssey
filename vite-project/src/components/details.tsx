import { Component } from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { Detailjson } from '../App';

export const Background = styled('div')({
  backgroundColor: '#11111b',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

interface DetailsProps {
  detailData: Detailjson[];
  params: { id: number };
}

  
class Details extends Component<DetailsProps> {
  // navigate: any;
  constructor(props: DetailsProps) {
    super(props);
  }

  handleBack = () => {
    // const { history } = this.props;
    window.location.href = `/`;
    // this.navigate('/');
  }

  render() {
    const { id } = this.props.params;
    const index = this.props.detailData.findIndex((item) => item.asteroidID === id);

    if (index !== -1) {
      const asteroid = this.props.detailData[index];

      return (
        <div>
          <Background>
            <Box display="flex"
              flexDirection="column"
              width="100%"
              height="100vh">

              <Box sx={{ height: '8%' }}>
                <Button sx={{ color: 'aliceblue', width: '5%' }} onClick={this.handleBack}>
                  &lt; Go Back
                </Button>
              </Box>

              <Box sx={{ height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3.5em', textDecoration: 'underline', color: 'aliceblue' }}>
                <p>{asteroid.name}</p>
              </Box>

              <Box sx={{ height: '60%', display: 'flex' }}>
                <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', fontSize: '2em' }}>
                  <p>ID: {asteroid.asteroidID}</p>
                  <p>Designation: {asteroid.designation}</p>
                  <p>Equinox: {asteroid.orbitdata.equinox}</p>
                  <p>Orbit ID: {asteroid.orbitdata.orbit_id}</p>
                  <p>Estimated Diameter: {asteroid.estimateddia.min_km.toFixed(3)} km - {asteroid.estimateddia.max_km.toFixed(3)} km</p>
                </Box>
                <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', fontSize: '2em' }}>
                  <p>First Observation Date: {asteroid.orbitdata.first_date}</p>
                  <p>Last Observation Date: {asteroid.orbitdata.last_date}</p>
                  <p>Hazardous: {asteroid.hazardous ? 'Yes' : 'No'}</p>
                  <p>Sentry Object: {asteroid.sentryobject ? 'Yes' : 'No'}</p>
                </Box>
              </Box>
            </Box>
          </Background>
        </div>
      );
    } else {
      return <div>ID {id} does not exist</div>;
    }
  }
}

export default (props: any) => (
  <Details {...props} params={useParams()}/>
);
