'use client';

import React from 'react';

export default function MatplotlibPlot({ plotType, questionId }) {
    if (plotType === 'perceptron_boundary' || questionId === 'q1') {
        return (
            <div style={{
                background: '#0d131f',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                borderRadius: '12px',
                padding: '1.25rem',
                margin: '1.25rem 0',
                color: '#e2e8f0',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingBottom: '0.75rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>📊</span>
                        <span style={{ fontWeight: '700', fontSize: '1rem', color: '#f8fafc' }}>
                            Figure 1: Perceptron Decision Boundary (OR Gate)
                        </span>
                    </div>
                    <span style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#10b981',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        padding: '0.2rem 0.6rem'
                    }}>
                        Accuracy: 100.0%
                    </span>
                </div>

                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <svg viewBox="0 0 550 360" style={{ width: '100%', maxWidth: '550px', display: 'block', margin: '0 auto', background: '#090d16', borderRadius: '8px' }}>
                        {/* Background grid */}
                        <defs>
                            <pattern id="grid_q1" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                            </pattern>
                            <linearGradient id="regionClass1" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.12)" />
                                <stop offset="100%" stopColor="rgba(16, 185, 129, 0.03)" />
                            </linearGradient>
                            <linearGradient id="regionClass0" x1="0" y1="1" x2="0" y2="0">
                                <stop offset="0%" stopColor="rgba(239, 68, 68, 0.12)" />
                                <stop offset="100%" stopColor="rgba(239, 68, 68, 0.02)" />
                            </linearGradient>
                        </defs>
                        <rect x="60" y="30" width="440" height="270" fill="url(#grid_q1)" />
                        
                        {/* Shaded decision regions */}
                        <polygon points="60,30 500,30 500,300 130,300 60,230" fill="url(#regionClass1)" />
                        <polygon points="60,230 130,300 60,300" fill="url(#regionClass0)" />

                        {/* Axes */}
                        <line x1="60" y1="300" x2="500" y2="300" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="60" y1="30" x2="60" y2="300" stroke="#94a3b8" strokeWidth="2" />

                        {/* Ticks and Axis Labels */}
                        <text x="60" y="325" fill="#94a3b8" fontSize="12" textAnchor="middle">0.0</text>
                        <text x="280" y="325" fill="#94a3b8" fontSize="12" textAnchor="middle">0.5</text>
                        <text x="500" y="325" fill="#94a3b8" fontSize="12" textAnchor="middle">1.0</text>
                        <text x="280" y="350" fill="#cbd5e1" fontSize="13" fontWeight="bold" textAnchor="middle">Input X₁</text>

                        <text x="40" y="305" fill="#94a3b8" fontSize="12" textAnchor="middle">0.0</text>
                        <text x="40" y="165" fill="#94a3b8" fontSize="12" textAnchor="middle">0.5</text>
                        <text x="40" y="35" fill="#94a3b8" fontSize="12" textAnchor="middle">1.0</text>
                        <text x="20" y="165" fill="#cbd5e1" fontSize="13" fontWeight="bold" textAnchor="middle" transform="rotate(-90 20 165)">Input X₂</text>

                        {/* Decision Boundary Line: w1*x1 + w2*x2 + b = 0 => x1 + x2 = 0.1 */}
                        {/* When x1=0, x2=0.1. (60, 300 - 0.1*270 = 273) */}
                        {/* When x2=0, x1=0.1. (60 + 0.1*440 = 104, 300) */}
                        <line x1="45" y1="260" x2="120" y2="315" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6,4" />
                        <text x="135" y="270" fill="#f59e0b" fontSize="11" fontWeight="bold">Decision Line (w·x + b = 0)</text>

                        {/* Data Points */}
                        {/* (0, 0) -> y = 0 : Class 0 */}
                        <circle cx="60" cy="300" r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                        <text x="80" y="295" fill="#fca5a5" fontSize="11" fontWeight="bold">(0, 0) Class: 0</text>

                        {/* (0, 1) -> y = 1 : Class 1 */}
                        <rect x="52" y="22" width="16" height="16" rx="3" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        <text x="75" y="34" fill="#6ee7b7" fontSize="11" fontWeight="bold">(0, 1) Class: 1</text>

                        {/* (1, 0) -> y = 1 : Class 1 */}
                        <rect x="492" y="292" width="16" height="16" rx="3" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        <text x="430" y="285" fill="#6ee7b7" fontSize="11" fontWeight="bold">(1, 0) Class: 1</text>

                        {/* (1, 1) -> y = 1 : Class 1 */}
                        <rect x="492" y="22" width="16" height="16" rx="3" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        <text x="430" y="34" fill="#6ee7b7" fontSize="11" fontWeight="bold">(1, 1) Class: 1</text>

                        {/* Legend */}
                        <rect x="340" y="45" width="150" height="60" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(255, 255, 255, 0.15)" />
                        <circle cx="355" cy="62" r="6" fill="#ef4444" />
                        <text x="370" y="66" fill="#e2e8f0" fontSize="11">Class 0 (False)</text>
                        <rect x="350" y="77" width="10" height="10" rx="2" fill="#10b981" />
                        <text x="370" y="86" fill="#e2e8f0" fontSize="11">Class 1 (True)</text>
                    </svg>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.5rem', textAlign: 'center' }}>
                    Weights: <code>[1.0, 1.0]</code> | Bias: <code>-0.1</code> | Decision Boundary: <code>x₁ + x₂ - 0.1 = 0</code>
                </div>
            </div>
        );
    }

    if (plotType === 'ann_training_curves' || questionId === 'q2') {
        return (
            <div style={{
                background: '#0d131f',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                borderRadius: '12px',
                padding: '1.25rem',
                margin: '1.25rem 0',
                color: '#e2e8f0',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingBottom: '0.75rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>📈</span>
                        <span style={{ fontWeight: '700', fontSize: '1rem', color: '#f8fafc' }}>
                            Matplotlib Output: plt.figure(figsize=(12, 5)) - Loss & Accuracy Curves
                        </span>
                    </div>
                    <span style={{
                        background: 'rgba(59, 130, 246, 0.15)',
                        color: '#60a5fa',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        padding: '0.2rem 0.6rem'
                    }}>
                        1000 Epochs (XOR ANN)
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                    {/* Subplot 1: Loss vs Epochs */}
                    <div style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '0.95rem', color: '#ef4444', marginBottom: '0.5rem' }}>
                            Loss vs Epochs
                        </div>
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: 'auto', display: 'block' }}>
                            <defs>
                                <pattern id="grid_loss" width="30" height="30" patternUnits="userSpaceOnUse">
                                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect x="40" y="20" width="260" height="160" fill="url(#grid_loss)" />

                            {/* Axes */}
                            <line x1="40" y1="180" x2="300" y2="180" stroke="#64748b" strokeWidth="1.5" />
                            <line x1="40" y1="20" x2="40" y2="180" stroke="#64748b" strokeWidth="1.5" />

                            {/* Ticks */}
                            <text x="40" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">0</text>
                            <text x="105" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">250</text>
                            <text x="170" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">500</text>
                            <text x="235" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">750</text>
                            <text x="300" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">1000</text>
                            <text x="170" y="214" fill="#cbd5e1" fontSize="11" fontWeight="600" textAnchor="middle">Epochs</text>

                            <text x="34" y="182" fill="#94a3b8" fontSize="10" textAnchor="end">0.0</text>
                            <text x="34" y="142" fill="#94a3b8" fontSize="10" textAnchor="end">0.2</text>
                            <text x="34" y="102" fill="#94a3b8" fontSize="10" textAnchor="end">0.4</text>
                            <text x="34" y="62" fill="#94a3b8" fontSize="10" textAnchor="end">0.6</text>
                            <text x="34" y="25" fill="#94a3b8" fontSize="10" textAnchor="end">0.8</text>
                            <text x="12" y="100" fill="#cbd5e1" fontSize="11" fontWeight="600" textAnchor="middle" transform="rotate(-90 12 100)">Loss</text>

                            {/* Red loss curve */}
                            <path
                                d="M 40,43 C 70,55 100,105 140,155 C 180,170 230,175 300,177"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="2.5"
                            />

                            {/* Legend */}
                            <rect x="220" y="28" width="70" height="24" rx="4" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(255, 255, 255, 0.15)" />
                            <line x1="228" y1="40" x2="246" y2="40" stroke="#ef4444" strokeWidth="2.5" />
                            <text x="252" y="44" fill="#e2e8f0" fontSize="10">Loss</text>
                        </svg>
                    </div>

                    {/* Subplot 2: Accuracy vs Epochs */}
                    <div style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '0.95rem', color: '#3b82f6', marginBottom: '0.5rem' }}>
                            Accuracy vs Epochs
                        </div>
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: 'auto', display: 'block' }}>
                            <defs>
                                <pattern id="grid_acc" width="30" height="30" patternUnits="userSpaceOnUse">
                                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect x="40" y="20" width="260" height="160" fill="url(#grid_acc)" />

                            {/* Axes */}
                            <line x1="40" y1="180" x2="300" y2="180" stroke="#64748b" strokeWidth="1.5" />
                            <line x1="40" y1="20" x2="40" y2="180" stroke="#64748b" strokeWidth="1.5" />

                            {/* Ticks */}
                            <text x="40" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">0</text>
                            <text x="105" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">250</text>
                            <text x="170" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">500</text>
                            <text x="235" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">750</text>
                            <text x="300" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">1000</text>
                            <text x="170" y="214" fill="#cbd5e1" fontSize="11" fontWeight="600" textAnchor="middle">Epochs</text>

                            <text x="34" y="182" fill="#94a3b8" fontSize="10" textAnchor="end">0.5</text>
                            <text x="34" y="142" fill="#94a3b8" fontSize="10" textAnchor="end">0.6</text>
                            <text x="34" y="102" fill="#94a3b8" fontSize="10" textAnchor="end">0.7</text>
                            <text x="34" y="62" fill="#94a3b8" fontSize="10" textAnchor="end">0.8</text>
                            <text x="34" y="25" fill="#94a3b8" fontSize="10" textAnchor="end">1.0</text>
                            <text x="12" y="100" fill="#cbd5e1" fontSize="11" fontWeight="600" textAnchor="middle" transform="rotate(-90 12 100)">Accuracy</text>

                            {/* Blue accuracy curve */}
                            <path
                                d="M 40,180 C 65,180 110,150 150,60 C 180,30 230,22 300,22"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="2.5"
                            />

                            {/* Legend */}
                            <rect x="200" y="140" width="85" height="24" rx="4" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(255, 255, 255, 0.15)" />
                            <line x1="208" y1="152" x2="226" y2="152" stroke="#3b82f6" strokeWidth="2.5" />
                            <text x="232" y="156" fill="#e2e8f0" fontSize="10">Accuracy</text>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }

    if (plotType === 'fashion_mnist_preview' || questionId === 'q3') {
        const samples = [
            { label: 'Ankle boot', icon: '🥾' },
            { label: 'T-shirt/top', icon: '👕' },
            { label: 'T-shirt/top', icon: '👕' },
            { label: 'Dress', icon: '👗' },
            { label: 'T-shirt/top', icon: '👕' }
        ];

        return (
            <div style={{
                background: '#0d131f',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                borderRadius: '12px',
                padding: '1.25rem',
                margin: '1.25rem 0',
                color: '#e2e8f0',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingBottom: '0.75rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>🖼️</span>
                        <span style={{ fontWeight: '700', fontSize: '1rem', color: '#f8fafc' }}>
                            Visual Output: Fashion-MNIST Samples & Training vs. Validation Accuracy
                        </span>
                    </div>
                    <span style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#10b981',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        padding: '0.2rem 0.6rem'
                    }}>
                        Test Accuracy: 91.25%
                    </span>
                </div>

                {/* 1. Fashion-MNIST 5 Sample Images (plt.imshow) */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.75rem' }}>
                        1. Sample Dataset Inspection (First 5 Images - plt.imshow with cmap=&apos;gray&apos;)
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '0.75rem' }}>
                        {samples.map((item, idx) => (
                            <div key={idx} style={{
                                background: '#131b2e',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                padding: '0.5rem',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                                    {item.label}
                                </div>
                                <div style={{
                                    width: '100%',
                                    aspectRatio: '1/1',
                                    background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    boxShadow: 'inset 0 0 12px rgba(0,0,0,0.6)'
                                }}>
                                    {item.icon}
                                </div>
                                <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.25rem' }}>
                                    28×28 Grayscale
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Training vs Validation Accuracy Plot */}
                <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.75rem' }}>
                        2. Training vs Validation Accuracy Graph (5 Epochs)
                    </div>
                    <div style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <svg viewBox="0 0 540 240" style={{ width: '100%', maxWidth: '540px', display: 'block', margin: '0 auto' }}>
                            <defs>
                                <pattern id="grid_cnn" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect x="50" y="25" width="450" height="170" fill="url(#grid_cnn)" />

                            {/* Axes */}
                            <line x1="50" y1="195" x2="500" y2="195" stroke="#64748b" strokeWidth="1.5" />
                            <line x1="50" y1="25" x2="50" y2="195" stroke="#64748b" strokeWidth="1.5" />

                            {/* Ticks */}
                            <text x="50" y="212" fill="#94a3b8" fontSize="11" textAnchor="middle">1</text>
                            <text x="162" y="212" fill="#94a3b8" fontSize="11" textAnchor="middle">2</text>
                            <text x="275" y="212" fill="#94a3b8" fontSize="11" textAnchor="middle">3</text>
                            <text x="387" y="212" fill="#94a3b8" fontSize="11" textAnchor="middle">4</text>
                            <text x="500" y="212" fill="#94a3b8" fontSize="11" textAnchor="middle">5</text>
                            <text x="275" y="232" fill="#cbd5e1" fontSize="12" fontWeight="600" textAnchor="middle">Epoch</text>

                            <text x="42" y="197" fill="#94a3b8" fontSize="10" textAnchor="end">0.84</text>
                            <text x="42" y="157" fill="#94a3b8" fontSize="10" textAnchor="end">0.87</text>
                            <text x="42" y="117" fill="#94a3b8" fontSize="10" textAnchor="end">0.90</text>
                            <text x="42" y="77" fill="#94a3b8" fontSize="10" textAnchor="end">0.93</text>
                            <text x="42" y="35" fill="#94a3b8" fontSize="10" textAnchor="end">0.96</text>
                            <text x="16" y="110" fill="#cbd5e1" fontSize="12" fontWeight="600" textAnchor="middle" transform="rotate(-90 16 110)">Accuracy</text>

                            {/* Training Accuracy line (Blue): 0.8576, 0.9025, 0.9192, 0.9304, 0.9412 */}
                            {/* y coords: 0.84 -> 195, 0.96 -> 25 (range 170 for 0.12 => 1416 px per unit) */}
                            {/* ep1: 195 - (0.8576-0.84)*1416 = 170 */}
                            {/* ep2: 195 - (0.9025-0.84)*1416 = 106 */}
                            {/* ep3: 195 - (0.9192-0.84)*1416 = 83 */}
                            {/* ep4: 195 - (0.9304-0.84)*1416 = 67 */}
                            {/* ep5: 195 - (0.9412-0.84)*1416 = 52 */}
                            <polyline
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="2.5"
                                points="50,170 162,106 275,83 387,67 500,52"
                            />
                            <circle cx="50" cy="170" r="4" fill="#3b82f6" />
                            <circle cx="162" cy="106" r="4" fill="#3b82f6" />
                            <circle cx="275" cy="83" r="4" fill="#3b82f6" />
                            <circle cx="387" cy="67" r="4" fill="#3b82f6" />
                            <circle cx="500" cy="52" r="4" fill="#3b82f6" />

                            {/* Validation Accuracy line (Orange): 0.8831, 0.8982, 0.9056, 0.9084, 0.9125 */}
                            {/* ep1: 195 - (0.8831-0.84)*1416 = 134 */}
                            {/* ep2: 195 - (0.8982-0.84)*1416 = 112 */}
                            {/* ep3: 195 - (0.9056-0.84)*1416 = 102 */}
                            {/* ep4: 195 - (0.9084-0.84)*1416 = 98 */}
                            {/* ep5: 195 - (0.9125-0.84)*1416 = 92 */}
                            <polyline
                                fill="none"
                                stroke="#f97316"
                                strokeWidth="2.5"
                                strokeDasharray="5,3"
                                points="50,134 162,112 275,102 387,98 500,92"
                            />
                            <circle cx="50" cy="134" r="4" fill="#f97316" />
                            <circle cx="162" cy="112" r="4" fill="#f97316" />
                            <circle cx="275" cy="102" r="4" fill="#f97316" />
                            <circle cx="387" cy="98" r="4" fill="#f97316" />
                            <circle cx="500" cy="92" r="4" fill="#f97316" />

                            {/* Legend */}
                            <rect x="310" y="140" width="180" height="45" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(255, 255, 255, 0.15)" />
                            <line x1="320" y1="152" x2="340" y2="152" stroke="#3b82f6" strokeWidth="2.5" />
                            <circle cx="330" cy="152" r="3" fill="#3b82f6" />
                            <text x="348" y="156" fill="#e2e8f0" fontSize="10">Training Accuracy</text>

                            <line x1="320" y1="172" x2="340" y2="172" stroke="#f97316" strokeWidth="2.5" strokeDasharray="4,2" />
                            <circle cx="330" cy="172" r="3" fill="#f97316" />
                            <text x="348" y="176" fill="#e2e8f0" fontSize="10">Validation Accuracy</text>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }

    if (plotType === 'deep_cnn_curves' || questionId === 'q4') {
        return (
            <div style={{
                background: '#0d131f',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                borderRadius: '12px',
                padding: '1.25rem',
                margin: '1.25rem 0',
                color: '#e2e8f0',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingBottom: '0.75rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>📊</span>
                        <span style={{ fontWeight: '700', fontSize: '1rem', color: '#f8fafc' }}>
                            Matplotlib Output: plt.figure(figsize=(12, 4)) - Accuracy & Loss vs Epochs
                        </span>
                    </div>
                    <span style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#10b981',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        padding: '0.2rem 0.6rem'
                    }}>
                        Test Accuracy: 91.30%
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                    {/* Subplot 1: Accuracy vs Epochs */}
                    <div style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '0.95rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
                            Accuracy vs Epochs
                        </div>
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: 'auto', display: 'block' }}>
                            <defs>
                                <pattern id="grid_q4_acc" width="30" height="30" patternUnits="userSpaceOnUse">
                                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect x="40" y="20" width="260" height="160" fill="url(#grid_q4_acc)" />

                            {/* Axes */}
                            <line x1="40" y1="180" x2="300" y2="180" stroke="#64748b" strokeWidth="1.5" />
                            <line x1="40" y1="20" x2="40" y2="180" stroke="#64748b" strokeWidth="1.5" />

                            {/* Ticks */}
                            <text x="40" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">1</text>
                            <text x="105" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">2</text>
                            <text x="170" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">3</text>
                            <text x="235" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">4</text>
                            <text x="300" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">5</text>
                            <text x="170" y="214" fill="#cbd5e1" fontSize="11" fontWeight="600" textAnchor="middle">Epochs</text>

                            <text x="34" y="182" fill="#94a3b8" fontSize="10" textAnchor="end">0.82</text>
                            <text x="34" y="142" fill="#94a3b8" fontSize="10" textAnchor="end">0.86</text>
                            <text x="34" y="102" fill="#94a3b8" fontSize="10" textAnchor="end">0.89</text>
                            <text x="34" y="62" fill="#94a3b8" fontSize="10" textAnchor="end">0.92</text>
                            <text x="34" y="25" fill="#94a3b8" fontSize="10" textAnchor="end">0.95</text>
                            <text x="12" y="100" fill="#cbd5e1" fontSize="11" fontWeight="600" textAnchor="middle" transform="rotate(-90 12 100)">Accuracy</text>

                            {/* Training Accuracy line (Blue) */}
                            <polyline
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="2.5"
                                points="40,160 105,95 170,72 235,58 300,48"
                            />
                            <circle cx="40" cy="160" r="3.5" fill="#3b82f6" />
                            <circle cx="105" cy="95" r="3.5" fill="#3b82f6" />
                            <circle cx="170" cy="72" r="3.5" fill="#3b82f6" />
                            <circle cx="235" cy="58" r="3.5" fill="#3b82f6" />
                            <circle cx="300" cy="48" r="3.5" fill="#3b82f6" />

                            {/* Validation Accuracy line (Orange) */}
                            <polyline
                                fill="none"
                                stroke="#f97316"
                                strokeWidth="2.5"
                                strokeDasharray="4,2"
                                points="40,115 105,88 170,80 235,72 300,66"
                            />
                            <circle cx="40" cy="115" r="3.5" fill="#f97316" />
                            <circle cx="105" cy="88" r="3.5" fill="#f97316" />
                            <circle cx="170" cy="80" r="3.5" fill="#f97316" />
                            <circle cx="235" cy="72" r="3.5" fill="#f97316" />
                            <circle cx="300" cy="66" r="3.5" fill="#f97316" />

                            {/* Legend */}
                            <rect x="155" y="130" width="140" height="42" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(255, 255, 255, 0.15)" />
                            <line x1="162" y1="142" x2="178" y2="142" stroke="#3b82f6" strokeWidth="2.5" />
                            <text x="184" y="145" fill="#e2e8f0" fontSize="9">Training Accuracy</text>
                            <line x1="162" y1="158" x2="178" y2="158" stroke="#f97316" strokeWidth="2.5" strokeDasharray="3,2" />
                            <text x="184" y="161" fill="#e2e8f0" fontSize="9">Validation Accuracy</text>
                        </svg>
                    </div>

                    {/* Subplot 2: Loss vs Epochs */}
                    <div style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '0.95rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
                            Loss vs Epochs
                        </div>
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: 'auto', display: 'block' }}>
                            <defs>
                                <pattern id="grid_q4_loss" width="30" height="30" patternUnits="userSpaceOnUse">
                                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect x="40" y="20" width="260" height="160" fill="url(#grid_q4_loss)" />

                            {/* Axes */}
                            <line x1="40" y1="180" x2="300" y2="180" stroke="#64748b" strokeWidth="1.5" />
                            <line x1="40" y1="20" x2="40" y2="180" stroke="#64748b" strokeWidth="1.5" />

                            {/* Ticks */}
                            <text x="40" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">1</text>
                            <text x="105" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">2</text>
                            <text x="170" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">3</text>
                            <text x="235" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">4</text>
                            <text x="300" y="196" fill="#94a3b8" fontSize="10" textAnchor="middle">5</text>
                            <text x="170" y="214" fill="#cbd5e1" fontSize="11" fontWeight="600" textAnchor="middle">Epochs</text>

                            <text x="34" y="182" fill="#94a3b8" fontSize="10" textAnchor="end">0.15</text>
                            <text x="34" y="142" fill="#94a3b8" fontSize="10" textAnchor="end">0.25</text>
                            <text x="34" y="102" fill="#94a3b8" fontSize="10" textAnchor="end">0.35</text>
                            <text x="34" y="62" fill="#94a3b8" fontSize="10" textAnchor="end">0.45</text>
                            <text x="34" y="25" fill="#94a3b8" fontSize="10" textAnchor="end">0.55</text>
                            <text x="12" y="100" fill="#cbd5e1" fontSize="11" fontWeight="600" textAnchor="middle" transform="rotate(-90 12 100)">Loss</text>

                            {/* Training Loss line (Blue) */}
                            <polyline
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="2.5"
                                points="40,60 105,120 170,138 235,151 300,161"
                            />
                            <circle cx="40" cy="60" r="3.5" fill="#3b82f6" />
                            <circle cx="105" cy="120" r="3.5" fill="#3b82f6" />
                            <circle cx="170" cy="138" r="3.5" fill="#3b82f6" />
                            <circle cx="235" cy="151" r="3.5" fill="#3b82f6" />
                            <circle cx="300" cy="161" r="3.5" fill="#3b82f6" />

                            {/* Validation Loss line (Orange) */}
                            <polyline
                                fill="none"
                                stroke="#f97316"
                                strokeWidth="2.5"
                                strokeDasharray="4,2"
                                points="40,102 105,125 170,132 235,138 300,140"
                            />
                            <circle cx="40" cy="102" r="3.5" fill="#f97316" />
                            <circle cx="105" cy="125" r="3.5" fill="#f97316" />
                            <circle cx="170" cy="132" r="3.5" fill="#f97316" />
                            <circle cx="235" cy="138" r="3.5" fill="#f97316" />
                            <circle cx="300" cy="140" r="3.5" fill="#f97316" />

                            {/* Legend */}
                            <rect x="180" y="30" width="115" height="42" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(255, 255, 255, 0.15)" />
                            <line x1="188" y1="42" x2="204" y2="42" stroke="#3b82f6" strokeWidth="2.5" />
                            <text x="210" y="45" fill="#e2e8f0" fontSize="9">Training Loss</text>
                            <line x1="188" y1="58" x2="204" y2="58" stroke="#f97316" strokeWidth="2.5" strokeDasharray="3,2" />
                            <text x="210" y="61" fill="#e2e8f0" fontSize="9">Validation Loss</text>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
