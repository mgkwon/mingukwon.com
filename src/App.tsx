import { useState } from 'react';
import GlobeView from './GlobeView';
import Timeline from './Timeline';

const locations = [
  { name: 'GyeongJu, Korea', ISO_A2: 'KR', lat: 35.8562, lng: 129.2247, year: 1990, details: 'Childhood and early education.' },
  { name: 'Grenfell, Canada', ISO_A2: 'CA', lat: 52.9399, lng: -106.4509, year: 2006, details: 'High school years.' },
  { name: 'Waterloo, Canada', ISO_A2: 'CA', lat: 43.4643, lng: -80.5204, year: 2009, details: 'University of Waterloo, CS & Robotics.' },
  { name: 'Shenzhen, China', ISO_A2: 'CN', lat: 22.5431, lng: 114.0579, year: 2015, details: 'Robotics internship at XYZ.' },
  { name: 'Barcelona, Spain', ISO_A2: 'ES', lat: 41.3851, lng: 2.1734, year: 2019, details: 'Full-time robotics engineer.' },
  { name: 'Barcelona, Spain', ISO_A2: 'ES', lat: 41.3851, lng: 2.1734, year: new Date().getFullYear(), details: "current" }
];

export default function App() {
  const [focused, setFocused] = useState<typeof locations[number] | null>(null);

  return (
    <div style={{ display: 'flex', height: '100svh' }}>
      <Timeline
        locations={locations}
        focused={focused}
        setFocused={setFocused}
      />
      <GlobeView focus={focused} locations={locations} />
    </div>
  );
}
