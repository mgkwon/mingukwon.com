import { useState, useEffect } from 'react';
import GlobeView from './GlobeView';
import Timeline from './Timeline';
import './App.css';

export default function App() {
  const [locations, setLocations] = useState([]);
  const [focused, setFocused] = useState(null);

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

  return (
    <div className="app-container">
      {focused && <Timeline
        locations={locations}
        focused={focused}
        setFocused={setFocused}
      />}
      <div className="globe-container">
        <GlobeView focus={focused} locations={locations} />
      </div>
    </div>
  );
}