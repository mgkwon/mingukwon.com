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
      job?: string;
    };

    type Props = {
      locations: Location[];
      focused: Location | null;
      setFocused: (loc: Location) => void;
    };

    type YearGroup = {
      year: number;
      locations: Location[];
    };

    const Timeline: React.FC<Props> = ({ locations, focused, setFocused }) => {
      const containerRef = useRef<HTMLDivElement>(null);
      const [virtualScrollY, setVirtualScrollY] = useState(0);
      const [progressHeight, setProgressHeight] = useState(0);
      const [showModal, setShowModal] = useState(false);

      // Group locations by year and sort in descending order
      const yearGroups = useMemo(() => {
        const groups = new Map<number, Location[]>();

        // Group locations by year
        locations.forEach(loc => {
          if (!groups.has(loc.year)) {
            groups.set(loc.year, []);
          }
          groups.get(loc.year)?.push(loc);
        });

        // Convert to array and sort in descending order
        return Array.from(groups.entries())
          .map(([year, locs]) => ({ year, locations: locs }))
          .sort((a, b) => b.year - a.year); // Descending order
      }, [locations]);

      // Calculate timeline positions based on proportional year gaps
      const timelineData = useMemo(() => {
        if (yearGroups.length === 0) return [];

        const totalHeight = window.innerHeight - 80; // Adjust for padding

        // Find the min and max years to calculate the total time span
        const maxYear = yearGroups[0].year;
        const minYear = yearGroups[yearGroups.length - 1].year;
        const totalYearSpan = maxYear - minYear;

        // If all years are the same, use uniform spacing
        if (totalYearSpan === 0) {
          return yearGroups.map((group, index) => {
            const positionY = (index / (yearGroups.length - 1 || 1)) * totalHeight + 40;
            return { ...group, positionY };
          });
        }

        // Calculate positions based on proportional year gaps
        return yearGroups.map(group => {
          // Calculate relative position (inverted since we want descending order)
          const relativePosition = (maxYear - group.year) / totalYearSpan;
          const positionY = relativePosition * totalHeight; // Add padding

          return {
            ...group,
            positionY
          };
        });
      }, [yearGroups]);

      // Find currently focused year group
      const focusedYearGroup = useMemo(() => {
        if (!focused) return null;
        return yearGroups.find(group => group.year === focused.year);
      }, [focused, yearGroups]);

      const updateFocusBasedOnScroll = (scrollY: number) => {
        const centerY = scrollY;

        // Find closest year group to current scroll position
        if (timelineData.length > 0) {
          const closest = timelineData.reduce((a, b) =>
            Math.abs(a.positionY - centerY) < Math.abs(b.positionY - centerY) ? a : b
          );

          // Set the first location from that year as focused
          if (closest && closest.locations.length > 0) {
            const newFocused = closest.locations[0];
            if (!focused || focused.year !== newFocused.year) {
              setFocused(newFocused);
            }
          }

          const maxScroll = window.innerHeight;
          setProgressHeight((scrollY / maxScroll) * 100);
        }
      };

      const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        setVirtualScrollY(prev => {
          const maxScroll = window.innerHeight;
          const next = Math.max(0, Math.min(prev + e.deltaY/10, maxScroll));
          updateFocusBasedOnScroll(next);
          return next;
        });
      };

      // Handle clicking on a year in the timeline
      const handleYearClick = (yearGroup: YearGroup) => {
        // Set the first location from this year as focused
        if (yearGroup.locations.length > 0) {
          setFocused(yearGroup.locations[0]);
          setShowModal(true);
        }
      };

      return (
        <aside className="timeline-sidebar">
          <div
            className="timeline-line-container"
            onWheel={handleWheel}
            ref={containerRef}
          >
            <div className="timeline-line" />
            <div className="timeline-line-progress" style={{ height: `${progressHeight}%` }} />

            {timelineData.map((yearGroup, i) => {
              const isFocused = focused?.year === yearGroup.year;

              return (
                <div key={i} className="timeline-item-wrapper">
                  <div
                    className={`timeline-dot-wrapper ${isFocused ? 'focused' : ''}`}
                    style={{ position: 'absolute', top: `${yearGroup.positionY}px` }}
                    onClick={() => handleYearClick(yearGroup)}
                  >
                    <div className="timeline-dot" />
                    <div className="timeline-label">
                      <strong>{yearGroup.year}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {showModal && focusedYearGroup && (
            <div className="timeline-modal-overlay" onClick={() => setShowModal(false)}>
              <div className="timeline-modal" onClick={e => e.stopPropagation()}>
                <div className="timeline-modal-header">
                  <h3>{focusedYearGroup.year}</h3>
                  <button className="close-button" onClick={() => setShowModal(false)}>×</button>
                </div>
                <div className="timeline-modal-content">
                  {focusedYearGroup.locations.map((loc, i) => (
                    <div key={i} className="timeline-modal-item">
                      <h4>{loc.name}</h4>
                      {loc.job && <div className="timeline-modal-job">{loc.job}</div>}
                      <p>{loc.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </aside>
      );
    };

    export default Timeline;