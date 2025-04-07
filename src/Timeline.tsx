import React, { useRef, useEffect, useMemo, useState } from 'react';
import './Timeline.css';

export type Location = {
  year: number;
  month?: number;
  name: string;
};

type Props = {
  locations: Location[];
  focused: Location | null;
  setFocused: (loc: Location) => void;
};

const Timeline: React.FC<Props> = ({ locations, focused, setFocused }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progressHeight, setProgressHeight] = useState(0);

  const baseDate = useMemo(() => {
    const min = locations.reduce((min, l) => {
      const d = new Date(l.year, l.month ?? 0);
      return d < min ? d : min;
    }, new Date(locations[0].year, locations[0].month ?? 0));
    return min;
  }, [locations]);

  const itemHeight = 20; // height per month

  const timelineData = useMemo(() => {
    return locations.map(loc => {
      const d = new Date(loc.year, loc.month ?? 0);
      const diff = (d.getFullYear() - baseDate.getFullYear()) * 12 + (d.getMonth() - baseDate.getMonth());
      return {
        ...loc,
        positionY: diff * itemHeight
      };
    });
  }, [locations, baseDate]);

  const totalHeight = timelineData[timelineData.length - 1].positionY + 300;

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    setProgressHeight((scrollTop / scrollHeight) * 100);

    const centerY = scrollTop + container.clientHeight / 2;
    const closest = timelineData.reduce((a, b) =>
      Math.abs(a.positionY - centerY) < Math.abs(b.positionY - centerY) ? a : b
    );

    if (
      !focused ||
      focused.name !== closest.name ||
      focused.year !== closest.year
    ) {
      setFocused(closest);
    }
  };

  return (
    <aside className="timeline-sidebar">
      <div className="timeline-line-container" ref={containerRef} onScroll={handleScroll}>
        <div className="timeline-line" />
        <div className="timeline-line-progress" style={{ height: `${progressHeight}%` }} />
        <div className="timeline-scroll-body" style={{ height: `${totalHeight}px` }}>
          {timelineData.map((loc, i) => {
            const isFocused = focused?.name === loc.name && focused?.year === loc.year;
            return (
              <div
                key={i}
                className={`timeline-dot-wrapper ${isFocused ? 'focused' : ''}`}
                style={{ top: `${loc.positionY}px` }}
                onClick={() => setFocused(loc)}
              >
                <div className="timeline-dot" />
                <div className="timeline-label">
                  <strong>{loc.year}</strong> {loc.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Timeline;
