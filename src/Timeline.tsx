import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Timeline.css';
import Header from './Header'

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

export type Experience = {
  title: string;
  company: string;
  link: string;
  location: string;
  start_date: string;
  end_date: string;
  points: string[];
};

type Props = {
  locations: Location[];
  focused: Location | null;
  setFocused: (loc: Location) => void;
  dimensions: { width: number; height: number };
};

type YearGroup = {
  year: number;
  locations: Location[];
  experiences?: Experience[];
};

const Timeline: React.FC<Props> = ({ locations, focused, setFocused, dimensions }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [virtualScrollY, setVirtualScrollY] = useState(0);
  const [progressHeight, setProgressHeight] = useState(0);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetch('/resume.json')
      .then(res => res.json())
      .then(data => setExperiences(data.Experience || []));
  }, []);

  const yearGroups = useMemo(() => {
    const groups = new Map<number, Location[]>();
    locations.forEach(loc => {
      if (!groups.has(loc.year)) groups.set(loc.year, []);
      groups.get(loc.year)?.push(loc);
    });
    return Array.from(groups.entries())
      .map(([year, locs]) => ({ year, locations: locs }))
      .sort((a, b) => b.year - a.year);
  }, [locations]);

  const timelineData = useMemo(() => {
    const totalHeight = dimensions.height - 80;
    if (yearGroups.length === 0) return [];
    yearGroups[yearGroups.length - 1].year = 2000;
    const maxYear = yearGroups[0].year;
    const minYear = yearGroups[yearGroups.length - 1].year;
    const span = maxYear - minYear || 1;

    return yearGroups.map(group => {
      const rel = (maxYear - group.year) / span;
      const positionY = rel * totalHeight + 30;
      const expMatches = experiences.filter(exp => {
        const startY = parseInt(exp.start_date.slice(0, 4));
        return group.year === startY;
      });

      return { ...group, positionY, experiences: expMatches };
    });
  }, [yearGroups, experiences, dimensions]);

  const updateFocusBasedOnScroll = (scrollY: number) => {
    const centerY = scrollY;
    if (timelineData.length > 0) {
      const closest = timelineData.reduce((a, b) =>
        Math.abs(a.positionY - centerY) < Math.abs(b.positionY - centerY) ? a : b
      );
      if (closest && closest.locations.length > 0) {
        const newFocused = closest.locations[0];
        if (!focused || focused.year !== newFocused.year) setFocused(newFocused);
      }
      const maxScroll = dimensions.height;
      setProgressHeight((scrollY / maxScroll) * 100);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setVirtualScrollY(prev => {
      const maxScroll = dimensions.height;
      const next = Math.max(0, Math.min(prev + e.deltaY / 10, maxScroll));
      updateFocusBasedOnScroll(next);
      return next;
    });
  };

  return (
    <aside className="timeline-sidebar">
      {/* Timeline scroll column */}
      <div className="timeline-line-container" onWheel={handleWheel} ref={containerRef}>
        <div className="timeline-line" />
        <div className="timeline-line-progress" style={{ height: `${progressHeight}%` }} />

        {timelineData.map((yearGroup, i) => {
          const isFocused = focused?.year === yearGroup.year;
          return (
            <div
              key={i}
              className="timeline-item-wrapper"
              style={{ top: `${yearGroup.positionY}px`, position: 'absolute' }}
            >
              <div
                className={`timeline-dot-wrapper ${isFocused ? 'focused' : ''}`}
                onClick={() => {
                  if (containerRef.current) {
                    const target = yearGroup.positionY - 2 ;
                    containerRef.current.scrollTo({
                      top: target,
                      behavior: 'smooth'
                    });
                    setVirtualScrollY(target);
                    updateFocusBasedOnScroll(target);
                  }

                  if (yearGroup.locations.length > 0) {
                    setFocused(yearGroup.locations[0]);
                  }
                }}
              >
                <div className="timeline-dot" />
                <div className="timeline-label"><strong>{yearGroup.year == 2000 ? 1990 : yearGroup.year}</strong></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Experience column — separate from timeline scroll */}
      <div className="timeline-experience-column">
        {focused?.year === new Date().getFullYear() && (
          <div className="timeline-header">
            {/* <Header/> */}
            <h1>MINGU KWON</h1>
            <div className="timeline-links-row">
              <a href="mailto:mgskwon@gmail.com">mgskwon@gmail.com</a>
              <a href="https://www.linkedin.com/in/mingukwon/" target="_blank">LinkedIn</a>
              <a href="https://moxfield.com/users/bisketo" target="_blank">Moxfield</a>
              <a href="https://heronnews.com" target="_blank">HeronNews</a>
            </div>
            {/* <h2>Roboticist living in Spain.</h2> */}
          </div>
        )}
        {timelineData
          .find(group => group.year === focused?.year)
          ?.experiences?.map((exp, j) => (
            <div key={j} className="timeline-experience-item">
              <h1>{exp.title}</h1>
              <h3>
                {exp.link ? (
                  <a href={exp.link} target="_blank" rel="noopener noreferrer">
                    {exp.company}
                  </a>
                ) : (
                  exp.company
                )}
              </h3>
              <h3>{exp.start_date} – {exp.end_date || 'Present'}, {exp.location}</h3>
              {/* <h3 className="timeline-exp-date">
                <span className="date">{exp.start_date} – {exp.end_date || 'Present'}</span>
                <span className="location">{exp.location}</span>
              </h3> */}
              <ul>
                {exp.points.map((pt, k) => <li key={k}>{pt}</li>)}
              </ul>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default Timeline;
