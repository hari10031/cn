'use client';

import { useState, useEffect, useRef } from 'react';

export default function KMeansVisualizer() {
    const [points, setPoints] = useState([]);
    const [centroids, setCentroids] = useState([]);
    const [step, setStep] = useState(0); // 0: Init, 1: Assigned, 2: Updated
    const [iterations, setIterations] = useState(0);

    const canvasWidth = 350;
    const canvasHeight = 250;

    // Generate random points in clusters
    const initData = () => {
        const newPoints = [];
        const numClusters = 3;
        const centers = [
            { x: 80, y: 70 },
            { x: 260, y: 90 },
            { x: 170, y: 190 }
        ];

        // Generate points around centers
        for (let c = 0; c < numClusters; c++) {
            const center = centers[c];
            for (let i = 0; i < 15; i++) {
                const angle = Math.random() * Math.PI * 2;
                const r = Math.random() * 40;
                newPoints.push({
                    x: Math.min(canvasWidth - 10, Math.max(10, center.x + Math.cos(angle) * r)),
                    y: Math.min(canvasHeight - 10, Math.max(10, center.y + Math.sin(angle) * r)),
                    cluster: -1
                });
            }
        }

        // Add some noise points
        for (let i = 0; i < 5; i++) {
            newPoints.push({
                x: Math.random() * (canvasWidth - 20) + 10,
                y: Math.random() * (canvasHeight - 20) + 10,
                cluster: -1
            });
        }

        setPoints(newPoints);
        setIterations(0);
        setStep(0);

        // Random centroids
        setCentroids([
            { x: Math.random() * 200 + 50, y: Math.random() * 150 + 50, color: '#ef4444' }, // Red
            { x: Math.random() * 200 + 50, y: Math.random() * 150 + 50, color: '#10b981' }, // Green
            { x: Math.random() * 200 + 50, y: Math.random() * 150 + 50, color: '#3b82f6' }  // Blue
        ]);
    };

    useEffect(() => {
        initData();
    }, []);

    // Helper: Euclidean distance
    const dist = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

    // Step 1: Assign each point to the closest centroid
    const assignPoints = () => {
        const updatedPoints = points.map(pt => {
            let minDist = Infinity;
            let bestCluster = -1;

            centroids.forEach((centroid, cIdx) => {
                const d = dist(pt, centroid);
                if (d < minDist) {
                    minDist = d;
                    bestCluster = cIdx;
                }
            });

            return { ...pt, cluster: bestCluster };
        });

        setPoints(updatedPoints);
        setStep(1);
    };

    // Step 2: Recalculate centroids
    const updateCentroids = () => {
        let moved = false;
        const newCentroids = centroids.map((centroid, cIdx) => {
            const clusterPoints = points.filter(p => p.cluster === cIdx);
            if (clusterPoints.length === 0) return centroid; // Keep as is if empty

            const avgX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
            const avgY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;

            if (Math.abs(centroid.x - avgX) > 0.5 || Math.abs(centroid.y - avgY) > 0.5) {
                moved = true;
            }

            return { ...centroid, x: avgX, y: avgY };
        });

        setCentroids(newCentroids);
        setIterations(prev => prev + 1);
        setStep(2);
    };

    const runKMeansStep = () => {
        if (step === 0 || step === 2) {
            assignPoints();
        } else {
            updateCentroids();
        }
    };

    return (
        <div style={containerStyle}>
            <h4 style={titleStyle}>📍 Interactive K-Means Clustering Simulator</h4>
            <p style={descStyle}>
                Demonstrates how clusters form. Click "Step" to toggle between assigning points to the nearest centroid and re-positioning centroids to cluster means.
            </p>

            <div style={workspaceStyle}>
                {/* Simulation Canvas */}
                <div style={{ position: 'relative' }}>
                    <svg width={canvasWidth} height={canvasHeight} style={svgStyle}>
                        {/* Lines linking points to their centroids (only in assigned state) */}
                        {step === 1 && points.map((p, idx) => {
                            if (p.cluster === -1) return null;
                            const c = centroids[p.cluster];
                            return (
                                <line
                                    key={`line-${idx}`}
                                    x1={p.x}
                                    y1={p.y}
                                    x2={c.x}
                                    y2={c.y}
                                    stroke={c.color}
                                    strokeOpacity="0.15"
                                    strokeWidth="1.5"
                                />
                            );
                        })}

                        {/* Data points */}
                        {points.map((p, idx) => {
                            const pointColor = p.cluster !== -1 ? centroids[p.cluster].color : '#94a3b8';
                            return (
                                <circle
                                    key={`pt-${idx}`}
                                    cx={p.x}
                                    cy={p.y}
                                    r="5"
                                    fill={pointColor}
                                    stroke="#0b0f19"
                                    strokeWidth="1"
                                    style={{ transition: 'fill 0.3s, cx 0.5s, cy 0.5s' }}
                                />
                            );
                        })}

                        {/* Centroids */}
                        {centroids.map((c, idx) => (
                            <g key={`c-${idx}`} style={{ transition: 'transform 0.5s' }}>
                                {/* Glow ring */}
                                <circle
                                    cx={c.x}
                                    cy={c.y}
                                    r="14"
                                    fill="none"
                                    stroke={c.color}
                                    strokeWidth="1"
                                    strokeOpacity="0.4"
                                />
                                {/* Centroid Cross X */}
                                <path
                                    d={`M ${c.x - 7} ${c.y - 7} L ${c.x + 7} ${c.y + 7} M ${c.x + 7} ${c.y - 7} L ${c.x - 7} ${c.y + 7}`}
                                    stroke={c.color}
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                            </g>
                        ))}
                    </svg>
                    <div style={statusOverlayStyle}>
                        Iter: {iterations} | Status:{' '}
                        <span style={{ color: '#818cf8', fontWeight: 'bold' }}>
                            {step === 0 ? 'Initialized' : step === 1 ? 'Points Assigned' : 'Centroids Updated'}
                        </span>
                    </div>
                </div>

                {/* Dashboard Controls */}
                <div style={controlsStyle}>
                    <button onClick={runKMeansStep} style={buttonStyle}>
                        🚀 {step === 1 ? 'Update Centroids' : 'Assign Clusters'}
                    </button>
                    <button onClick={initData} style={resetButtonStyle}>
                        🔄 Re-Initialize
                    </button>

                    <div style={infoBoxStyle}>
                        <div style={infoTitleStyle}>Clustering Process:</div>
                        <ol style={olStyle}>
                            <li style={step === 1 ? activeLiStyle : liStyle}>Assign observations to nearest centroid using Euclidean distance.</li>
                            <li style={step === 2 ? activeLiStyle : liStyle}>Compute average position of assigned points to relocate centroids.</li>
                            <li style={liStyle}>Repeat until centroids stabilize (no changes).</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Styling definitions
const containerStyle = {
    background: 'rgba(15, 23, 42, 0.6)',
    borderRadius: '12px',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    padding: '1.5rem',
    marginTop: '1.5rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
};

const titleStyle = {
    color: '#818cf8',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
};

const descStyle = {
    color: '#94a3b8',
    fontSize: '0.85rem',
    marginBottom: '1.2rem',
    lineHeight: '1.4'
};

const workspaceStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    alignItems: 'center',
    justifyContent: 'center'
};

const svgStyle = {
    background: '#0b0f19',
    borderRadius: '8px',
    border: '1px solid #334155',
    boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.5)',
    display: 'block'
};

const statusOverlayStyle = {
    position: 'absolute',
    bottom: '8px',
    left: '8px',
    background: 'rgba(15, 23, 42, 0.85)',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.65rem',
    color: '#94a3b8',
    border: '1px solid #334155',
    pointerEvents: 'none'
};

const controlsStyle = {
    flex: '1',
    minWidth: '240px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
};

const buttonStyle = {
    padding: '0.75rem',
    border: 'none',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
    transition: 'all 0.2s'
};

const resetButtonStyle = {
    padding: '0.6rem',
    border: '1px solid #475569',
    borderRadius: '8px',
    background: '#1e293b',
    color: '#f1f5f9',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
};

const infoBoxStyle = {
    background: 'rgba(30, 41, 59, 0.4)',
    border: '1px solid rgba(255,255,255,0.05)',
    padding: '0.75rem',
    borderRadius: '8px',
    fontSize: '0.75rem',
    color: '#cbd5e1'
};

const infoTitleStyle = {
    fontWeight: 'bold',
    color: '#94a3b8',
    marginBottom: '0.35rem'
};

const olStyle = {
    paddingLeft: '1rem',
    lineHeight: '1.4',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem'
};

const liStyle = {
    color: '#94a3b8',
    transition: 'color 0.3s'
};

const activeLiStyle = {
    color: '#f472b6',
    fontWeight: '600',
    transition: 'color 0.3s'
};
