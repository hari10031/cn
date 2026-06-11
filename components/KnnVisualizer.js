'use client';

import { useState } from 'react';

export default function KnnVisualizer() {
    const [k, setK] = useState(3);
    const [testPoint, setTestPoint] = useState({ x: 175, y: 125 });

    // Training dataset (2D projections: Sepal Length vs Sepal Width representation)
    const dataset = [
        // Class 0 (Red) - Cluster left-bottom
        { x: 60, y: 170, label: 0, color: '#ef4444' },
        { x: 75, y: 155, label: 0, color: '#ef4444' },
        { x: 90, y: 180, label: 0, color: '#ef4444' },
        { x: 80, y: 140, label: 0, color: '#ef4444' },
        { x: 100, y: 160, label: 0, color: '#ef4444' },
        { x: 110, y: 185, label: 0, color: '#ef4444' },

        // Class 1 (Blue) - Cluster top-middle
        { x: 160, y: 70, label: 1, color: '#3b82f6' },
        { x: 180, y: 90, label: 1, color: '#3b82f6' },
        { x: 195, y: 65, label: 1, color: '#3b82f6' },
        { x: 170, y: 110, label: 1, color: '#3b82f6' },
        { x: 210, y: 95, label: 1, color: '#3b82f6' },
        { x: 150, y: 90, label: 1, color: '#3b82f6' },

        // Class 2 (Green) - Cluster right-bottom
        { x: 240, y: 160, label: 2, color: '#10b981' },
        { x: 260, y: 145, label: 2, color: '#10b981' },
        { x: 280, y: 175, label: 2, color: '#10b981' },
        { x: 250, y: 190, label: 2, color: '#10b981' },
        { x: 230, y: 175, label: 2, color: '#10b981' },
        { x: 275, y: 130, label: 2, color: '#10b981' }
    ];

    const canvasWidth = 350;
    const canvasHeight = 250;

    // Click canvas handler to place test point
    const handleCanvasClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        setTestPoint({ x: clickX, y: clickY });
    };

    // Calculate distances
    const distances = dataset.map((pt, idx) => {
        const d = Math.sqrt((pt.x - testPoint.x) ** 2 + (pt.y - testPoint.y) ** 2);
        return { ...pt, d, idx };
    });

    // Sort and find K-nearest neighbors
    const nearestNeighbors = [...distances].sort((a, b) => a.d - b.d).slice(0, k);

    // Vote tallying
    const votes = { 0: 0, 1: 0, 2: 0 };
    nearestNeighbors.forEach(n => {
        votes[n.label] += 1;
    });

    // Find winning class
    let predLabel = 0;
    if (votes[1] > votes[predLabel]) predLabel = 1;
    if (votes[2] > votes[predLabel]) predLabel = 2;

    const classNames = { 0: 'Setosa (Class 0)', 1: 'Versicolor (Class 1)', 2: 'Virginica (Class 2)' };
    const classColors = { 0: '#ef4444', 1: '#3b82f6', 2: '#10b981' };

    return (
        <div style={containerStyle}>
            <h4 style={titleStyle}>🔍 Interactive KNN Classification Playground</h4>
            <p style={descStyle}>
                Click anywhere on the plot below to place the Test Instance (Yellow star). The model will draw links to the K closest neighbors and classify it using majority voting.
            </p>

            <div style={workspaceStyle}>
                {/* SVG Graph Plot */}
                <div style={{ position: 'relative' }}>
                    <svg
                        width={canvasWidth}
                        height={canvasHeight}
                        onClick={handleCanvasClick}
                        style={svgStyle}
                    >
                        {/* Links to nearest neighbors */}
                        {nearestNeighbors.map((n, idx) => (
                            <line
                                key={`link-${idx}`}
                                x1={testPoint.x}
                                y1={testPoint.y}
                                x2={n.x}
                                y2={n.y}
                                stroke="#f59e0b"
                                strokeWidth="1.5"
                                strokeDasharray="3 3"
                            />
                        ))}

                        {/* Decision circles around test point */}
                        {nearestNeighbors.length > 0 && (
                            <circle
                                cx={testPoint.x}
                                cy={testPoint.y}
                                r={nearestNeighbors[nearestNeighbors.length - 1].d}
                                fill="rgba(245, 158, 11, 0.03)"
                                stroke="rgba(245, 158, 11, 0.2)"
                                strokeWidth="1"
                                strokeDasharray="5 5"
                            />
                        )}

                        {/* Dataset points */}
                        {dataset.map((p, idx) => (
                            <circle
                                key={`train-${idx}`}
                                cx={p.x}
                                cy={p.y}
                                r="6"
                                fill={p.color}
                                stroke={nearestNeighbors.some(n => n.idx === idx) ? '#ffffff' : '#0b0f19'}
                                strokeWidth={nearestNeighbors.some(n => n.idx === idx) ? '2.5' : '1'}
                            />
                        ))}

                        {/* Test Point (Yellow star representation) */}
                        <g>
                            {/* Glow */}
                            <circle
                                cx={testPoint.x}
                                cy={testPoint.y}
                                r="10"
                                fill="rgba(245, 158, 11, 0.4)"
                                style={{ pointerEvents: 'none' }}
                            />
                            {/* Star center */}
                            <polygon
                                points="0,-7 2,-2 7,-2 3,1 5,6 0,3 -5,6 -3,1 -7,-2 -2,-2"
                                transform={`translate(${testPoint.x}, ${testPoint.y}) scale(1.3)`}
                                fill="#fbbf24"
                                stroke="#d97706"
                                strokeWidth="1"
                                style={{ pointerEvents: 'none' }}
                            />
                        </g>
                    </svg>
                    <div style={canvasTipStyle}>Click anywhere on plot to classify</div>
                </div>

                {/* Dashboard Panel */}
                <div style={controlsStyle}>
                    <div style={sliderContainerStyle}>
                        <div style={sliderRowStyle}>
                            <label style={labelStyle}>Number of Neighbors (K): <span style={kStyle}>{k}</span></label>
                            <input
                                type="range"
                                min="1"
                                max="9"
                                step="2"
                                value={k}
                                onChange={(e) => setK(parseInt(e.target.value))}
                                style={sliderStyle}
                            />
                        </div>
                    </div>

                    <div style={resultsCardStyle}>
                        <div style={resTitleStyle}>Classification Breakdown</div>
                        <div style={votesContainerStyle}>
                            <div style={voteRowStyle}>
                                <span style={{ ...dotStyle, backgroundColor: '#ef4444' }}></span>
                                <span style={voteNameStyle}>Class 0:</span>
                                <span style={voteValStyle}>{votes[0]} votes</span>
                            </div>
                            <div style={voteRowStyle}>
                                <span style={{ ...dotStyle, backgroundColor: '#3b82f6' }}></span>
                                <span style={voteNameStyle}>Class 1:</span>
                                <span style={voteValStyle}>{votes[1]} votes</span>
                            </div>
                            <div style={voteRowStyle}>
                                <span style={{ ...dotStyle, backgroundColor: '#10b981' }}></span>
                                <span style={voteNameStyle}>Class 2:</span>
                                <span style={voteValStyle}>{votes[2]} votes</span>
                            </div>
                        </div>

                        <div style={{ ...predictionBoxStyle, borderLeft: `4px solid ${classColors[predLabel]}` }}>
                            <div style={predLabelStyle}>Prediction:</div>
                            <div style={{ ...predValStyle, color: classColors[predLabel] }}>{classNames[predLabel]}</div>
                        </div>
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
    display: 'block',
    cursor: 'crosshair'
};

const canvasTipStyle = {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    fontSize: '0.6rem',
    color: '#64748b',
    pointerEvents: 'none'
};

const controlsStyle = {
    flex: '1',
    minWidth: '240px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem'
};

const sliderContainerStyle = {
    background: 'rgba(30, 41, 59, 0.4)',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.05)'
};

const sliderRowStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
};

const labelStyle = {
    color: '#cbd5e1',
    fontSize: '0.8rem',
    display: 'flex',
    justifyContent: 'space-between'
};

const kStyle = {
    color: '#fbbf24',
    fontWeight: 'bold'
};

const sliderStyle = {
    width: '100%',
    cursor: 'pointer',
    accentColor: '#fbbf24'
};

const resultsCardStyle = {
    background: 'rgba(30, 41, 59, 0.4)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '8px',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
};

const resTitleStyle = {
    color: '#94a3b8',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    borderBottom: '1px solid #334155',
    paddingBottom: '0.35rem'
};

const votesContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem'
};

const voteRowStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.75rem',
    gap: '0.5rem'
};

const dotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%'
};

const voteNameStyle = {
    color: '#cbd5e1',
    width: '60px'
};

const voteValStyle = {
    color: '#94a3b8',
    fontWeight: '500'
};

const predictionBoxStyle = {
    background: 'rgba(15, 23, 42, 0.4)',
    padding: '0.5rem 0.75rem',
    borderRadius: '4px'
};

const predLabelStyle = {
    fontSize: '0.65rem',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
};

const predValStyle = {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginTop: '0.15rem'
};
