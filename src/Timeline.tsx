import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Timeline.css';

export type Location = {
  year: number;
  month?: number;
  name: string;
  details: string;
  lat: number;
  lng: number;
  ISO_A2: string;
};

type Props = {
  locations: Location[];
  focused: Location | null;
  setFocused: (loc: Location) => void;
};

const Timeline: React.FC<Props> = ({ locations, focused, setFocused }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [virtualScrollY, setVirtualScrollY] = useState(0);
  const [progressHeight, setProgressHeight] = useState(0);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const baseDate = useMemo(() => {
    return locations.reduce((min, l) => {
      const d = new Date(l.year, l.month ?? 0);
      return d < min ? d : min;
    }, new Date(locations[0].year, locations[0].month ?? 0));
  }, [locations]);

  const lastLoc = locations[locations.length - 1];
  const lastDate = new Date(lastLoc.year, lastLoc.month ?? 0);
  const maxMonths = (lastDate.getFullYear() - baseDate.getFullYear()) * 12 + (lastDate.getMonth() - baseDate.getMonth()) + 12;

  const totalHeight = window.innerHeight;

  const timelineData = locations.map(loc => {
    const d = new Date(loc.year, loc.month ?? 0);
    const diff = (d.getFullYear() - baseDate.getFullYear()) * 12 + (d.getMonth() - baseDate.getMonth());

    const fraction = diff / maxMonths;
    const positionY = fraction * (totalHeight - 30);

    console.log(positionY)
    console.log(totalHeight)

    return {
      ...loc,
      positionY
    };
  });

  const updateFocusBasedOnScroll = (scrollY: number) => {
    const centerY = scrollY;
    const closest = timelineData.reduce((a, b) =>
      Math.abs(a.positionY - centerY) < Math.abs(b.positionY - centerY) ? a : b
    );

    if (!focused || focused.name !== closest.name || focused.year !== closest.year) {
      setFocused(closest);
      setShowDetails(closest.name + closest.year);
    }

    const maxScroll = totalHeight;
    setProgressHeight((scrollY / maxScroll) * 100);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setVirtualScrollY(prev => {
      const maxScroll = totalHeight;
      const next = Math.max(0, Math.min(prev + e.deltaY/10, maxScroll));
      updateFocusBasedOnScroll(next);
      console.log(next);
      return next;
    });
  };

  // useEffect(() => {
  //   if (focused) {
  //     const target = timelineData.find(l => l.name === focused.name && l.year === focused.year);
  //     if (target) {
  //       const next = Math.max(0, target.positionY - totalHeight / 2);
  //       setVirtualScrollY(next);
  //       updateFocusBasedOnScroll(next);
  //     }
  //   }
  // }, [focused?.name, focused?.year]);

  return (
    <aside className="timeline-sidebar">
      <div
        className="timeline-line-container"
        onWheel={handleWheel}
        ref={containerRef}
      >
        <div className="timeline-line" />
        <div className="timeline-line-progress" style={{ height: `${progressHeight}%` }} />

          {timelineData.map((loc, i) => {
            const isFocused = focused?.name === loc.name && focused?.year === loc.year;
            const isShowingDetails = showDetails === (loc.name + loc.year);

            return (
              <div key={i} className="timeline-item-wrapper">
                <div
                  className={`timeline-dot-wrapper ${isFocused ? 'focused' : ''}`}
                  style={{ position: 'absolute', top: `${loc.positionY}px` }}
                  onClick={() => {
                    setFocused(loc);
                    setShowDetails(isShowingDetails ? null : loc.name + loc.year);
                  }}
                >
                  <div className="timeline-dot" />
                  <div className="timeline-label">
                    <strong>{loc.year}</strong> {loc.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </aside>
  );
};

export default Timeline;
