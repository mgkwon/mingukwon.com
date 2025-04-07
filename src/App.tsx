import { useState, useEffect } from 'react';
import GlobeView from './GlobeView';
import Timeline from './Timeline';
import './App.css';

// Update locations with more detailed information
const locations = [
  { 
    name: 'GyeongJu, Korea', 
    ISO_A2: 'KR', 
    lat: 35.8562, 
    lng: 129.2247, 
    year: 1990, 
    details: 'Childhood and early education. Grew up surrounded by historic temples and traditional Korean culture.' 
  },
  { 
    name: 'Grenfell, Canada', 
    ISO_A2: 'CA', 
    lat: 50.4139, 
    lng: -102.9305, 
    year: 2006, 
    details: 'High school years. First international experience and adaptation to Western education.' 
  },
  { 
    name: 'Waterloo, Canada', 
    ISO_A2: 'CA', 
    lat: 43.4643, 
    lng: -80.5204, 
    year: 2009, 
    details: 'University of Waterloo, Computer Science & Robotics. Foundational education in technology.' 
  },
  { 
    name: 'Shenzhen, China', 
    ISO_A2: 'CN', 
    lat: 22.5431, 
    lng: 114.0579, 
    year: 2015, 
    details: 'Robotics internship. First-hand experience with manufacturing and hardware development in tech hub of China.' 
  },
  { 
    name: 'Barcelona, Spain', 
    ISO_A2: 'ES', 
    lat: 41.3851, 
    lng: 2.1734, 
    year: 2019, 
    details: 'Full-time robotics engineer. Leading innovation in European tech scene while enjoying Mediterranean lifestyle.' 
  },
  { 
    name: 'Current Location', 
    ISO_A2: 'ES', 
    lat: 41.3851, 
    lng: 2.1734, 
    year: new Date().getFullYear(), 
    details: "Currently working on cutting-edge projects in AI and robotics integration, focusing on sustainable technology solutions." 
  }
];

export default function App() {
  const [focused, setFocused] = useState<typeof locations[number] | null>(locations[0]);

  // Set initial focus when component mounts
  useEffect(() => {
    if (!focused && locations.length > 0) {
      setFocused(locations[0]);
    }
  }, []);

  return (
    <div className="app-container">
      <Timeline
        locations={locations}
        focused={focused}
        setFocused={setFocused}
      />
      <div className="globe-container">
        <GlobeView focus={focused} locations={locations} />
      </div>
    </div>
  );
}
