// App.tsx
import { useState } from 'react';
import GlobeView from './GlobeView';

const locations = [
  { name: '경주', lat: 35.8562, lng: 129.2247, year: '199X', details: 'Childhood and early education.' },
  { name: 'Saskatchewan', lat: 52.9399, lng: -106.4509, year: '200X', details: 'High school years.' },
  { name: 'Waterloo', lat: 43.4643, lng: -80.5204, year: '201X', details: 'University of Waterloo, CS & Robotics.' },
  { name: 'Shenzhen', lat: 22.5431, lng: 114.0579, year: '201X', details: 'Robotics internship at XYZ.' },
  { name: 'Barcelona', lat: 41.3851, lng: 2.1734, year: '202X', details: 'Full-time robotics engineer.' },
];

export default function App() {
  const [focused, setFocused] = useState(null);

  return (
    <div style={{ display: 'flex', height: '100svh' }}>
      <aside style={{ width: '300px', padding: '1rem', background: '#111', color: '#fff', overflowY: 'auto' }}>
        <h2>My Journey</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {locations.map((loc, i) => (
            <li key={i} style={{ margin: '1rem 0', cursor: 'pointer' }} onClick={() => setFocused(loc)}>
              <strong>[{loc.year}]</strong> {loc.name}
            </li>
          ))}
        </ul>
      </aside>
      <div>
        <GlobeView focus={focused} locations={locations} />
      </div>
    </div>
  );
} 
