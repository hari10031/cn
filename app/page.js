'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { algorithmsData } from '../data/questions';
import { answersData } from '../data/answers';

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
    const [copied, setCopied] = useState(false);

    const handlePasscodeSubmit = (e) => {
        e.preventDefault();
        if (passcode === '54') {
            setIsAuthenticated(true);
            setError(false);
        } else {
            setError(true);
            setPasscode('');
            setTimeout(() => setError(false), 2000);
        }
    };

    const handleAlgorithmSelect = (algorithmId) => {
        setSelectedAlgorithm(algorithmId);
        setCopied(false);
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const currentAlgorithm = selectedAlgorithm
        ? algorithmsData.find(a => a.id === selectedAlgorithm)
        : null;

    const currentCode = selectedAlgorithm ? answersData[selectedAlgorithm] : null;

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
                        <div className={styles.lockIcon}>🔒</div>
                        <h2 className={styles.lockTitle}>Access Required</h2>
                        <p className={styles.lockSubtitle}>Enter passcode to continue</p>

                        <form onSubmit={handlePasscodeSubmit} className={styles.lockForm}>
                            <input
                                type="password"
                                value={passcode}
                                onChange={(e) => setPasscode(e.target.value)}
                                placeholder="Enter passcode"
                                className={`${styles.lockInput} ${error ? styles.lockInputError : ''}`}
                                autoFocus
                            />
                            <button type="submit" className={styles.lockButton}>
                                Unlock
                            </button>
                        </form>

                        {error && (
                            <p className={styles.lockError}>❌ Invalid passcode</p>
                        )}
                    </div>
                </div>

                <div className={styles.blurredContent}>
                    <div className={styles.content}>
                        <header className={styles.header}>
                            <h1 className={styles.title}>Algorithm Code Portal</h1>
                            <p className={styles.subtitle}>Specially Made for ....</p>
                        </header>
                        <div className={styles.mockContent}>
                            <div className={styles.mockButtons}></div>
                            <div className={styles.mockCode}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Main Content (after authentication)
    return (
        <div className={styles.container}>
            <div className={styles.backgroundDecoration}>
                <div className={`${styles.circle} ${styles.circle1}`}></div>
                <div className={`${styles.circle} ${styles.circle2}`}></div>
            </div>

            <div className={styles.content}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Algorithm Code Portal</h1>
                    <p className={styles.subtitle}>
                        Specially Made for ....
                    </p>
                </header>

                <div className={styles.setSelector}>
                    <label className={styles.selectorLabel}>Select Algorithm</label>
                    <div className={styles.algorithmGrid}>
                        {algorithmsData.map((algo) => (
                            <button
                                key={algo.id}
                                onClick={() => handleAlgorithmSelect(algo.id)}
                                className={`${styles.algorithmButton} ${selectedAlgorithm === algo.id ? styles.active : ''}`}
                            >
                                {algo.name}
                            </button>
                        ))}
                    </div>
                </div>

                {currentAlgorithm ? (
                    <div className={styles.questionsContainer}>
                        <div className={styles.questionCard}>
                            <div className={styles.questionHeader}>
                                <span className={styles.questionLabel}>{currentAlgorithm.fullName}</span>
                            </div>

                            <div className={styles.codeContainer}>
                                <button
                                    onClick={() => copyToClipboard(currentCode)}
                                    className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
                                >
                                    <svg className={styles.copyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {copied ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        )}
                                    </svg>
                                    {copied ? 'Copied!' : 'Copy Code'}
                                </button>
                                <pre className={styles.codeBlock}><code>{currentCode}</code></pre>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyStateIcon}>🚀</div>
                        <p className={styles.emptyStateText}>
                            Please select an algorithm to view its implementation
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
