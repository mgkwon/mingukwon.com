import { useState, useEffect } from 'react';
import GlobeView from './GlobeView';
import Timeline from './Timeline';
import './App.css';

export default function App() {
  const [locations, setLocations] = useState([]);
  const [focused, setFocused] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Fetch locations on mount
  useEffect(() => {
    fetch('/locations.json')
      .then((res) => res.json())
      .then(setLocations)
      .catch((err) => console.error('Failed to load JSON:', err));
  }, []);

  // Set initial focus when locations are loaded
  useEffect(() => {
    if (!focused && locations.length > 0) {
      // Set focus to the most recent location (should be the first one now in descending order)
      const sortedLocations = [...locations].sort((a, b) => b.year - a.year);
      setFocused(sortedLocations[0]);
    }
  }, [locations]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app-container">
      {focused && <Timeline
        locations={locations}
        focused={focused}
        setFocused={setFocused}
        dimensions={dimensions}
      />}
      <div className="globe-container">
        <GlobeView focus={focused} locations={locations} dimensions={dimensions} />
      </div>
    </div>
  );
}