'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { algorithmsData } from '../data/questions';
import { answersData } from '../data/answers';

// Import visualizers
import KMeansVisualizer from '../components/KMeansVisualizer';
import KnnVisualizer from '../components/KnnVisualizer';
import MetricsCalculator from '../components/MetricsCalculator';

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState(false);
    const [selectedSetId, setSelectedSetId] = useState('set2');
    const [selectedPartIndex, setSelectedPartIndex] = useState(0);
    const [copied, setCopied] = useState(false);
    const [activeSubTab, setActiveSubTab] = useState(0); // For parts with multiple implementations (e.g. 5a)

    const handlePasscodeSubmit = (e) => {
        e.preventDefault();
        if (passcode === '2203') {
            setIsAuthenticated(true);
            setError(false);
        } else {
            setError(true);
            setPasscode('');
            setTimeout(() => setError(false), 2000);
        }
    };

    const handleSetSelect = (setId) => {
        setSelectedSetId(setId);
        setSelectedPartIndex(0);
        setActiveSubTab(0);
        setCopied(false);
    };

    const handlePartSelect = (index) => {
        setSelectedPartIndex(index);
        setActiveSubTab(0);
        setCopied(false);
    };

    const copyToClipboard = async (text, label) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(label);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Generate and download Jupyter Notebook (.ipynb)
    const downloadNotebook = (codeText, filename) => {
        const lines = codeText.split('\n').map((line, idx, arr) => 
            idx === arr.length - 1 ? line : line + '\n'
        );

        const notebookData = {
            cells: [
                {
                    cell_type: "code",
                    execution_count: null,
                    metadata: {},
                    outputs: [],
                    source: lines
                }
            ],
            metadata: {
                kernelspec: {
                    display_name: "Python 3",
                    language: "python",
                    name: "python3"
                },
                language_info: {
                    name: "python"
                }
            },
            nbformat: 4,
            nbformat_minor: 2
        };

        const notebookName = filename.replace(/\.py$/, '.ipynb');
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(notebookData, null, 2)], { type: 'application/x-ipynb+json;charset=utf-8' });
        element.href = URL.createObjectURL(file);
        element.download = notebookName;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    // Find current active set and part
    const currentSet = algorithmsData.find(s => s.id === selectedSetId) || algorithmsData[0];
    const currentPart = currentSet.parts[selectedPartIndex] || currentSet.parts[0];

    // Get answers data
    const answerEntry = answersData[currentPart.id];
    let displayCode = '';
    let displayOutput = '';
    let hasSubTabs = false;
    let subTabs = [];

    if (answerEntry) {
        if (Array.isArray(answerEntry)) {
            hasSubTabs = true;
            subTabs = answerEntry.map(entry => entry.title);
            const activeEntry = answerEntry[activeSubTab] || answerEntry[0];
            displayCode = activeEntry.code;
            displayOutput = activeEntry.output;
        } else {
            displayCode = answerEntry.code;
            displayOutput = answerEntry.output;
        }
    }

    // Determine filename for download
    const rawFilename = `${currentPart.id}_${currentPart.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
    const filename = `${rawFilename}.ipynb`;

    // Render corresponding Visualizer component
    const renderVisualizer = (id) => {
        switch (id) {
            case '4b':
                return <KMeansVisualizer />;
            case '5a':
                return <KnnVisualizer />;
            case '8a':
                return <MetricsCalculator />;
            default:
                return null;
        }
    };

    // Passcode Lock Screen
    if (!isAuthenticated) {
        return (
            <div className={styles.container}>
                <div className={styles.backgroundDecoration}>
                    <div className={`${styles.circle} ${styles.circle1}`}></div>
                    <div className={`${styles.circle} ${styles.circle2}`}></div>
                </div>

                <div className={styles.lockScreen}>
                    <div className={styles.lockCard}>
                        <div className={styles.lockIcon}>🔐</div>
                        <h2 className={styles.lockTitle}>Lab Code Portal</h2>
                        <p style={{ color: '#818cf8', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            Artificial Intelligence & Machine Learning
                        </p>
                        <p className={styles.lockSubtitle}>Enter security passcode to continue</p>

                        <form onSubmit={handlePasscodeSubmit} className={styles.lockForm}>
                            <input
                                type="password"
                                value={passcode}
                                onChange={(e) => setPasscode(e.target.value)}
                                placeholder="••••"
                                className={`${styles.lockInput} ${error ? styles.lockInputError : ''}`}
                                autoFocus
                            />
                            <button type="submit" className={styles.lockButton}>
                                Unlock Portal
                            </button>
                        </form>

                        {error && (
                            <p className={styles.lockError}>❌ Invalid Passcode</p>
                        )}
                    </div>
                </div>

                <div className={styles.blurredContent}>
                    <div className={styles.content}>
                        <header className={styles.header}>
                            <h1 className={styles.title}>AIML Lab Manual Portal</h1>
                            <p className={styles.subtitle}>Curated codes and outputs according to Sets</p>
                        </header>
                    </div>
                </div>
            </div>
        );
    }

    // Main Content
    return (
        <div className={styles.container}>
            <div className={styles.backgroundDecoration}>
                <div className={`${styles.circle} ${styles.circle1}`}></div>
                <div className={`${styles.circle} ${styles.circle2}`}></div>
            </div>

            <div className={styles.mainWrapper}>
                {/* Sidebar Navigation */}
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeader}>
                        <span className={styles.sidebarLogo}>🤖</span>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>AIML Lab Portal</div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Regulation R21 - VI Sem</div>
                        </div>
                    </div>

                    <nav className={styles.setNav}>
                        <div className={styles.navSectionTitle}>Lab Sets</div>
                        {algorithmsData.map((set) => (
                            <button
                                key={set.id}
                                onClick={() => handleSetSelect(set.id)}
                                className={`${styles.setNavItem} ${selectedSetId === set.id ? styles.activeSet : ''}`}
                            >
                                <span className={styles.setNumber}>{set.name.split(' ')[1]}</span>
                                <div className={styles.setDetails}>
                                    <div className={styles.setName}>{set.name}</div>
                                    <div className={styles.setDescription}>{set.description}</div>
                                </div>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Dashboard Area */}
                <main className={styles.dashboard}>
                    <header className={styles.dashboardHeader}>
                        <div style={{ textAlign: 'left' }}>
                            <h1 className={styles.dashboardTitle}>{currentSet.name}</h1>
                            <p className={styles.dashboardSubtitle}>{currentSet.description}</p>
                        </div>
                        <div className={styles.badge}>R21 Syllabus</div>
                    </header>

                    {/* Part Tabs Selector */}
                    {currentSet.parts.length > 1 && (
                        <div className={styles.tabsContainer}>
                            {currentSet.parts.map((part, index) => (
                                <button
                                    key={part.id}
                                    onClick={() => handlePartSelect(index)}
                                    className={`${styles.tabItem} ${selectedPartIndex === index ? styles.activeTab : ''}`}
                                >
                                    {part.title}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Details Panel */}
                    <div className={styles.detailsContainer}>
                        <div className={styles.questionCard}>
                            <h3 className={styles.partHeader}>{currentPart.fullName}</h3>
                            <p className={styles.partDescription}>{currentPart.description}</p>

                            {/* Dynamic Simulation / visualizer */}
                            {renderVisualizer(currentPart.id)}

                            {/* Implementation details */}
                            <div className={styles.implementationHeader}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.25rem' }}>📓</span>
                                    <span style={{ fontWeight: '700', fontSize: '1rem', color: '#cbd5e1' }}>Jupyter Notebook Source</span>
                                </div>

                                {/* Code Sub tabs (Scratch vs Scikit-learn) */}
                                {hasSubTabs && (
                                    <div className={styles.subTabs}>
                                        {subTabs.map((tabTitle, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => { setActiveSubTab(idx); setCopied(false); }}
                                                className={`${styles.subTabItem} ${activeSubTab === idx ? styles.activeSubTabItem : ''}`}
                                            >
                                                {tabTitle}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Python Code Display */}
                            {displayCode && (
                                <div className={styles.codeContainer}>
                                    <div className={styles.codeHeader}>
                                        <span className={styles.fileName}>{filename}</span>
                                        <div className={styles.actionButtons}>
                                            <button
                                                onClick={() => copyToClipboard(displayCode, 'code')}
                                                className={`${styles.copyButton} ${copied === 'code' ? styles.copied : ''}`}
                                            >
                                                {copied === 'code' ? 'Copied!' : 'Copy Code'}
                                            </button>
                                            <button
                                                onClick={() => downloadNotebook(displayCode, filename)}
                                                className={styles.downloadButton}
                                            >
                                                Download .ipynb
                                            </button>
                                        </div>
                                    </div>
                                    <pre className={styles.codeBlock}>
                                        <code>{displayCode}</code>
                                    </pre>
                                </div>
                            )}

                            {/* Expected Output */}
                            {displayOutput && (
                                <div className={styles.outputContainer}>
                                    <div className={styles.outputHeader}>
                                        <span className={styles.outputTitle}>🖥️ Expected Console Output</span>
                                        <button
                                            onClick={() => copyToClipboard(displayOutput, 'output')}
                                            className={`${styles.copyButton} ${styles.smallCopyButton} ${copied === 'output' ? styles.copied : ''}`}
                                        >
                                            {copied === 'output' ? 'Copied Output!' : 'Copy Output'}
                                        </button>
                                    </div>
                                    <pre className={styles.outputBlock}>
                                        <code>{displayOutput}</code>
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
