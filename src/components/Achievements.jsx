import React, { useState, useEffect, useRef } from 'react';

// Custom hook for intersection observer
const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

// Custom hook for animated counting
const useCountUp = (end, duration = 2000, shouldStart) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (shouldStart) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
};

// Styles object
const styles = {
  achievements: {
    padding: '4rem 0',
  },
  achievementCards: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  achievementCard: {
    backgroundColor: 'var(--card-background, white)',
    borderRadius: '10px',
    padding: '2rem',
    width: 'calc(25% - 2rem)',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  achievementNumber: {
    fontSize: '2.5rem',
    color: 'var(--primary-color, #4F46E5)',
  },
  achievementDescription: {
    color: 'var(--text-color, #1F2937)',
  },
};

function Achievements() {
  const achievements = [
    { number: 50000, description: 'Solar Panels Installed' },
    { number: 1000, description: 'Wind Turbines Deployed' },
    { number: 100000, description: 'Tons of CO2 Emissions Reduced' },
    { number: 10000, description: 'Happy Clients' }
  ];

  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  return (
    <div className="bg-gray-100 py-12" style={styles.achievements} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>Our Impact</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" style={styles.achievementCards}>
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg" style={styles.achievementCard}>
              <div className="px-4 py-5 sm:p-6 text-center">
                <div className="text-3xl font-semibold" style={styles.achievementNumber}>
                  {useCountUp(achievement.number, 2000, isIntersecting).toLocaleString()}+
                </div>
                <div className="mt-1 text-xl font-medium" style={styles.achievementDescription}>{achievement.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Achievements;