import { useState, useEffect, useMemo, useRef } from 'react';
import { MeshLambertMaterial, DoubleSide } from 'three';
import * as topojson from 'https://esm.sh/topojson-client';
import { scaleSequentialSqrt } from 'https://esm.sh/d3-scale';
import { interpolateYlOrRd } from 'https://esm.sh/d3-scale-chromatic';

import Globe from 'react-globe.gl';

const polygonsMaterial = new MeshLambertMaterial({ color: 'darkslategrey', side: DoubleSide });
const globeMaterial = new MeshLambertMaterial({color: 'rgba(200,130,100,0.5)'})

export default function GlobeView({ focus, locations }) {
  const [landPolygons, setLandPolygons] = useState([]);
  const [countries, setCountries] = useState({ features: []});
  const [hoverD, setHoverD] = useState();
  const globeRef = useRef();

  const validISOs = useMemo(() => new Set(locations.map(loc => loc.ISO_A2)), [locations]);
  const highlightedCountries = countries.features.filter(d => validISOs.has(d.properties.ISO_A2));

  // Focus the globe on the selected location
  useEffect(() => {
    if (focus && globeRef.current) {
      const { lat, lng } = focus;
      
      globeRef.current.pointOfView({
        lat,
        lng,
        altitude: 1.8
      }, 1000); // 1000ms animation duration
    }
  }, [focus]);

  useEffect(() => {
    // Load land polygons
    fetch('//unpkg.com/world-atlas/land-110m.json').then(res => res.json())
      .then(landTopo => {
        setLandPolygons(topojson.feature(landTopo, landTopo.objects.land).features);
      });
  }, []);

  useEffect(() => {
    // Load country data
    fetch('/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
      });
  }, []);

  // Prepare location points data
  const pointsData = useMemo(() => {
    return locations.map(loc => ({
      ...loc,
      size: focus && focus.name === loc.name ? 1.5 : 0.8,
      color: focus && focus.name === loc.name ? '#FF5733' : '#1E212D'
    }));
  }, [locations, focus]);
  
  return (
    <Globe
      ref={globeRef}
      width={window.innerWidth - 200} // Adjust based on sidebar width
      height={window.innerHeight}
      globeMaterial={globeMaterial}
      backgroundColor="#FAF3E0"
      showGlobe={true}
      atmosphereColor='#27548A'
      showAtmosphere={false}
      // atmosphereColor="#F0E6D8"
      // atmosphereAltitude={0.15}
      
      // Country polygons
      polygonsData={[...landPolygons, ...highlightedCountries]}
      polygonCapColor={(d) =>
        validISOs.has(d.properties?.ISO_A2) ? '#1E212D' : '#B68973'
      }
      polygonAltitude={(d) =>
        validISOs.has(d.properties?.ISO_A2) ? 0.02 : 0.01}
      polygonStrokeColor={() => '#FAF3E0'}
      polygonsTransitionDuration={300}
      
      // Location points
      pointsData={pointsData}
      pointLabel={d => `${d.name} (${d.year}): ${d.details}`}
      pointAltitude={0.01}
      pointRadius="size"
      pointColor="color"
      pointsMerge={false}
      pointsTransitionDuration={500}
    />
  );
}
