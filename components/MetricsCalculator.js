'use client';

import { useState } from 'react';

export default function MetricsCalculator() {
    // Default values matching page 30 of the manual: [[73, 29], [13, 90]] (TN=73, FP=29, FN=13, TP=90)
    const [tp, setTp] = useState(90);
    const [tn, setTn] = useState(73);
    const [fp, setFp] = useState(29);
    const [fn, setFn] = useState(13);

    // Calculations
    const total = tp + tn + fp + fn;

    const tpr = total > 0 && (tp + fn) > 0 ? tp / (tp + fn) : 0; // Recall
    const fpr = total > 0 && (fp + tn) > 0 ? fp / (fp + tn) : 0;
    const precision = total > 0 && (tp + fp) > 0 ? tp / (tp + fp) : 0;
    const fScore = (precision + tpr) > 0 ? (2 * precision * tpr) / (precision + tpr) : 0;
    const accuracy = total > 0 ? (tp + tn) / total : 0;

    const formatPercent = (val) => `${(val * 100).toFixed(1)}%`;
    const formatDecimal = (val) => val.toFixed(4);

    return (
        <div style={containerStyle}>
            <h4 style={titleStyle}>📊 Interactive Confusion Matrix & Metrics Calculator</h4>
            <p style={descStyle}>
                Modify the counts in the Confusion Matrix grid below to dynamically re-evaluate model performance indicators (Accuracy, Precision, Recall/TPR, FPR, F-Score).
            </p>

            <div style={workspaceStyle}>
                {/* Grid Inputs */}
                <div style={matrixContainerStyle}>
                    <div style={matrixTitleStyle}>Confusion Matrix Editor</div>
                    <div style={gridStyle}>
                        <div style={gridLabelStyle}></div>
                        <div style={gridColumnHeaderStyle}>Predicted Positive</div>
                        <div style={gridColumnHeaderStyle}>Predicted Negative</div>

                        <div style={gridRowHeaderStyle}>Actual Positive</div>
                        <div style={cellStyle}>
                            <label style={cellLabelStyle}>True Positive (TP)</label>
                            <input
                                type="number"
                                min="0"
                                max="1000"
                                value={tp}
                                onChange={(e) => setTp(Math.max(0, parseInt(e.target.value) || 0))}
                                style={inputStyle}
                            />
                        </div>
                        <div style={cellStyle}>
                            <label style={cellLabelStyle}>False Negative (FN)</label>
                            <input
                                type="number"
                                min="0"
                                max="1000"
                                value={fn}
                                onChange={(e) => setFn(Math.max(0, parseInt(e.target.value) || 0))}
                                style={inputStyle}
                            />
                        </div>

                        <div style={gridRowHeaderStyle}>Actual Negative</div>
                        <div style={cellStyle}>
                            <label style={cellLabelStyle}>False Positive (FP)</label>
                            <input
                                type="number"
                                min="0"
                                max="1000"
                                value={fp}
                                onChange={(e) => setFp(Math.max(0, parseInt(e.target.value) || 0))}
                                style={inputStyle}
                            />
                        </div>
                        <div style={cellStyle}>
                            <label style={cellLabelStyle}>True Negative (TN)</label>
                            <input
                                type="number"
                                min="0"
                                max="1000"
                                value={tn}
                                onChange={(e) => setTn(Math.max(0, parseInt(e.target.value) || 0))}
                                style={inputStyle}
                            />
                        </div>
                    </div>
                    <div style={totalStyle}>Total Evaluated Samples: <span style={totalNumStyle}>{total}</span></div>
                </div>

                {/* Metrics Results */}
                <div style={resultsStyle}>
                    <div style={metricsTitleStyle}>Computed Performance Metrics</div>

                    <div style={metricListStyle}>
                        {/* Accuracy */}
                        <div style={metricItemStyle}>
                            <div style={metricHeaderStyle}>
                                <span>Accuracy:</span>
                                <span style={metricValueStyle}>{formatPercent(accuracy)} ({formatDecimal(accuracy)})</span>
                            </div>
                            <div style={progressBgStyle}>
                                <div style={{ ...progressFillStyle, width: `${accuracy * 100}%`, backgroundColor: '#10b981' }}></div>
                            </div>
                            <div style={formulaStyle}>Formula: (TP + TN) / Total</div>
                        </div>

                        {/* Recall / TPR */}
                        <div style={metricItemStyle}>
                            <div style={metricHeaderStyle}>
                                <span>True Positive Rate (TPR / Recall):</span>
                                <span style={metricValueStyle}>{formatPercent(tpr)} ({formatDecimal(tpr)})</span>
                            </div>
                            <div style={progressBgStyle}>
                                <div style={{ ...progressFillStyle, width: `${tpr * 100}%`, backgroundColor: '#6366f1' }}></div>
                            </div>
                            <div style={formulaStyle}>Formula: TP / (TP + FN)</div>
                        </div>

                        {/* False Positive Rate (FPR) */}
                        <div style={metricItemStyle}>
                            <div style={metricHeaderStyle}>
                                <span>False Positive Rate (FPR):</span>
                                <span style={{ ...metricValueStyle, color: '#f43f5e' }}>{formatPercent(fpr)} ({formatDecimal(fpr)})</span>
                            </div>
                            <div style={progressBgStyle}>
                                <div style={{ ...progressFillStyle, width: `${fpr * 100}%`, backgroundColor: '#f43f5e' }}></div>
                            </div>
                            <div style={formulaStyle}>Formula: FP / (FP + TN)</div>
                        </div>

                        {/* Precision */}
                        <div style={metricItemStyle}>
                            <div style={metricHeaderStyle}>
                                <span>Precision:</span>
                                <span style={metricValueStyle}>{formatPercent(precision)} ({formatDecimal(precision)})</span>
                            </div>
                            <div style={progressBgStyle}>
                                <div style={{ ...progressFillStyle, width: `${precision * 100}%`, backgroundColor: '#818cf8' }}></div>
                            </div>
                            <div style={formulaStyle}>Formula: TP / (TP + FP)</div>
                        </div>

                        {/* F1-Score */}
                        <div style={metricItemStyle}>
                            <div style={metricHeaderStyle}>
                                <span>F1-Score:</span>
                                <span style={metricValueStyle}>{formatPercent(fScore)} ({formatDecimal(fScore)})</span>
                            </div>
                            <div style={progressBgStyle}>
                                <div style={{ ...progressFillStyle, width: `${fScore * 100}%`, backgroundColor: '#f472b6' }}></div>
                            </div>
                            <div style={formulaStyle}>Formula: 2 * (Precision * Recall) / (Precision + Recall)</div>
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
    alignItems: 'flex-start',
    justifyContent: 'center'
};

const matrixContainerStyle = {
    background: '#0b0f19',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '1rem',
    flex: '1',
    minWidth: '280px'
};

const matrixTitleStyle = {
    color: '#cbd5e1',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    textAlign: 'center'
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '80px 1fr 1fr',
    gap: '0.5rem',
    alignItems: 'center',
    textAlign: 'center'
};

const gridLabelStyle = {
    fontSize: '0.75rem',
    color: '#64748b'
};

const gridColumnHeaderStyle = {
    fontSize: '0.75rem',
    color: '#94a3b8',
    fontWeight: 'bold',
    padding: '0.25rem 0'
};

const gridRowHeaderStyle = {
    fontSize: '0.75rem',
    color: '#94a3b8',
    fontWeight: 'bold',
    textAlign: 'left'
};

const cellStyle = {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '6px',
    padding: '0.35rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.15rem'
};

const cellLabelStyle = {
    fontSize: '0.55rem',
    color: '#64748b',
    textTransform: 'uppercase'
};

const inputStyle = {
    background: 'transparent',
    border: 'none',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    outline: 'none'
};

const totalStyle = {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.75rem',
    color: '#94a3b8'
};

const totalNumStyle = {
    color: '#818cf8',
    fontWeight: 'bold'
};

const resultsStyle = {
    flex: '1.2',
    minWidth: '280px',
    background: 'rgba(30, 41, 59, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    padding: '1rem'
};

const metricsTitleStyle = {
    color: '#cbd5e1',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    borderBottom: '1px solid #334155',
    paddingBottom: '0.35rem'
};

const metricListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem'
};

const metricItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
};

const metricHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.75rem',
    color: '#cbd5e1'
};

const metricValueStyle = {
    fontWeight: 'bold',
    color: '#818cf8'
};

const progressBgStyle = {
    width: '100%',
    height: '6px',
    background: '#0f172a',
    borderRadius: '3px',
    overflow: 'hidden'
};

const progressFillStyle = {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.4s ease-out'
};

const formulaStyle = {
    fontSize: '0.6rem',
    color: '#64748b',
    textAlign: 'right'
};
