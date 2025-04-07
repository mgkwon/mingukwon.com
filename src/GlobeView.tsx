import { useState, useEffect, useMemo } from 'react';
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

  const validISOs = useMemo(() => new Set(locations.map(loc => loc.ISO_A2)), [locations]);
  const highlightedCountries = countries.features.filter(d => validISOs.has(d.properties.ISO_A2));


  useEffect(() => {
    // load data
    fetch('//unpkg.com/world-atlas/land-110m.json').then(res => res.json())
      .then(landTopo => {
        setLandPolygons(topojson.feature(landTopo, landTopo.objects.land).features);
      });
  }, []);

  useEffect(() => {
    fetch('/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
      });
      console.log(countries);
  }, []);

  const colorScale = scaleSequentialSqrt(interpolateYlOrRd);

  // GDP per capita (avoiding countries with small pop)
  // const getVal = feat => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

  // const maxVal = useMemo(
  //   () => Math.max(...countries.features.map(getVal)),
  //   [countries]
  // );
  // colorScale.domain([0, maxVal]);
  
  return <Globe
  globeMaterial={globeMaterial}
  backgroundColor="#FAF6F0"
  showGlobe={true}
  showAtmosphere={false}

  polygonsData={[...landPolygons, ...highlightedCountries]}
  polygonCapColor={(d) =>
    validISOs.has(d.properties?.ISO_A2) ? 'steelblue' : 'darkslategrey'
  }
  // polygonSideColor={(d) =>
  //   validISOs.has(d.properties?.ISO_A2) ? 'rgba(70, 130, 180, 0.5)' : 'rgba(238, 232, 232, 0.84)'
  // }
  polygonAltitude={(d) =>
    validISOs.has(d.properties?.ISO_A2) ? 0.02 : 0.01}
  polygonStrokeColor={() => '#1E212D'}
  polygonLabel={({ properties: d }) => <div>
    <div><b>{d.ADMIN} ({d.ISO_A2}):</b></div>
    <div>GDP: <i>{d.GDP_MD_EST}</i> M$</div>
    <div>Population: <i>{d.POP_EST}</i></div>
  </div>}
  // onPolygonHover={setHoverD}
  polygonsTransitionDuration={300}
/>;
};