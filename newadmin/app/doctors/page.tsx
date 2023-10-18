import React from 'react'
import Homee from '../homee/page';
import Navbar from '../navbar/page';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import img from './dr.png';

const Page: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 345 }}>
          <div style={{ position: 'relative', width: '100%', height: '140px' }}>
            <Image
              src={img}
              alt="Doctor"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Dr Angelo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  )
}

export default Page