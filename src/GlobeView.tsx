import { useState, useEffect, useMemo, useRef } from 'react';
import { MeshLambertMaterial, DoubleSide } from 'three';
import * as topojson from 'https://esm.sh/topojson-client';
import { scaleSequentialSqrt } from 'https://esm.sh/d3-scale';
import { interpolateYlOrRd } from 'https://esm.sh/d3-scale-chromatic';

import Globe from 'react-globe.gl';

export default function GlobeView({ focus, locations, dimensions}) {
  const [landPolygons, setLandPolygons] = useState([]);
  const [countries, setCountries] = useState({ features: []});
  const [hoverD, setHoverD] = useState();
  const globeRef = useRef();

  const validISOs = useMemo(() => new Set(locations.map(loc => loc.ISO_A2)), [locations]);
  const highlightedCountries = countries.features.filter(d => validISOs.has(d.properties.ISO_A2));
  const restOfCountries = countries.features.filter(d => !validISOs.has(d.properties.ISO_A2));

  function getColorFromVar(variableName, alpha) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  }

  const globeMaterial = new MeshLambertMaterial({color: getColorFromVar("--ocean-color")})

  // Focus the globe on the selected location
  useEffect(() => {
    if (focus && globeRef.current) {
      const { lat, lng } = focus;

      globeRef.current.pointOfView({
        lat,
        lng,
        altitude: 1.8
      }, 1000); // 1000ms animation duration

      if (globeRef.current && globeRef.current.controls()) {
        const controls = globeRef.current.controls();
        controls.minDistance = 400; // ⬅️ Min zoom (closer = smaller number)
        controls.maxDistance = 700; // ⬅️ Max zoom out
      }
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
      size: focus && focus.name === loc.name ? 0.5 : 0.0,
      color: focus && focus.name === loc.name ? getColorFromVar("--primary-color") : getColorFromVar("--primary-color")
    }));
  }, [locations, focus]);

  return (
    <Globe
      ref={globeRef}
      width={dimensions.width - 1050} // assuming your sidebar is 300px
      height={dimensions.height}
      globeMaterial={globeMaterial}
      backgroundColor={getColorFromVar("--background-color")}
      showGlobe={true}
      showAtmosphere={false}

      // Country polygons
      // polygonsData={[...landPolygons, ...highlightedCountries]}
      polygonsData={[...restOfCountries, ...highlightedCountries]}
      polygonCapColor={(d) =>
        validISOs.has(d.properties?.ISO_A2) ? getColorFromVar("--secondary-color") : getColorFromVar("--land-color")
      }
      polygonAltitude={(d) =>
        validISOs.has(d.properties?.ISO_A2) ? 0.012 : 0.007}
      polygonStrokeColor={() => getColorFromVar("--tertiary-color")}
      polygonsTransitionDuration={300}

      // Location points
      pointsData={pointsData}
      pointLabel={d => `${d.name} (${d.year}): ${d.details}`}
      pointAltitude={0.03 }
      pointRadius="size"
      pointColor="color"
      pointsMerge={false}
      pointsTransitionDuration={500}
    />
  );
}
