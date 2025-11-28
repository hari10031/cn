'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { questionsData } from '../data/questions';
import { answersData } from '../data/answers';

export default function Home() {
    const [selectedSet, setSelectedSet] = useState(null);
    const [copiedA, setCopiedA] = useState(false);
    const [copiedB, setCopiedB] = useState(false);
    const [copiedBlocks, setCopiedBlocks] = useState({});

    const handleSetSelect = (setNum) => {
        setSelectedSet(setNum);
        setCopiedA(false);
        setCopiedB(false);
        setCopiedBlocks({});
    };

    const copyToClipboard = async (text, question) => {
        try {
            await navigator.clipboard.writeText(text);
            if (question === 'a') {
                setCopiedA(true);
                setTimeout(() => setCopiedA(false), 2000);
            } else {
                setCopiedB(true);
                setTimeout(() => setCopiedB(false), 2000);
            }
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const copyCodeBlock = async (code, blockKey) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedBlocks({ ...copiedBlocks, [blockKey]: true });
            setTimeout(() => {
                setCopiedBlocks(prev => ({ ...prev, [blockKey]: false }));
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const currentQuestionSet = selectedSet
        ? questionsData.find(q => q.setNumber === selectedSet)
        : null;

    const currentAnswers = selectedSet ? answersData[selectedSet] : null;

    return (
        <div className={styles.container}>
            <div className={styles.backgroundDecoration}>
                <div className={`${styles.circle} ${styles.circle1}`}></div>
                <div className={`${styles.circle} ${styles.circle2}`}></div>
            </div>

            <div className={styles.content}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Question Answer Portal</h1>
                    <p className={styles.subtitle}>
                        Specially Made for ..... 👀🙄
                    </p>
                </header>

                <div className={styles.setSelector}>
                    <label className={styles.selectorLabel}>Select Set Number (1-15)</label>
                    <div className={styles.setGrid}>
                        {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                            <button
                                key={num}
                                onClick={() => handleSetSelect(num)}
                                className={`${styles.setButton} ${selectedSet === num ? styles.active : ''}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                {currentQuestionSet ? (
                    <div className={styles.questionsContainer}>
                        {/* Question A */}
                        <div className={styles.questionCard}>
                            <div className={styles.questionHeader}>
                                <span className={styles.questionLabel}>Question A</span>
                            </div>
                            <p className={styles.questionText}>{currentQuestionSet.questionA}</p>
                            <div className={styles.answerLabel}>Answer:</div>

                            {Array.isArray(currentAnswers.a) ? (
                                // Handle array of code blocks with individual clipboard buttons
                                currentAnswers.a.map((block, index) => (
                                    <div key={index} className={styles.codeBlockContainer}>
                                        <div className={styles.codeBlockHeader}>
                                            <span className={styles.codeBlockTitle}>{block.title}</span>
                                            <button
                                                onClick={() => copyCodeBlock(block.code, `a-${index}`)}
                                                className={`${styles.copyButton} ${styles.smallCopyButton} ${copiedBlocks[`a-${index}`] ? styles.copied : ''}`}
                                            >
                                                <svg className={styles.copyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    {copiedBlocks[`a-${index}`] ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    ) : (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    )}
                                                </svg>
                                                {copiedBlocks[`a-${index}`] ? 'Copied!' : 'Copy'}
                                            </button>
                                        </div>
                                        <pre className={styles.codeBlock}><code>{block.code}</code></pre>
                                    </div>
                                ))
                            ) : (
                                // Handle single string format (backward compatibility)
                                <>
                                    <button
                                        onClick={() => copyToClipboard(currentAnswers.a, 'a')}
                                        className={`${styles.copyButton} ${copiedA ? styles.copied : ''}`}
                                    >
                                        <svg className={styles.copyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {copiedA ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            )}
                                        </svg>
                                        {copiedA ? 'Copied!' : 'Copy Answer'}
                                    </button>
                                    <pre className={styles.codeBlock}><code>{currentAnswers.a}</code></pre>
                                </>
                            )}
                        </div>

                        {/* Question B */}
                        <div className={styles.questionCard}>
                            <div className={styles.questionHeader}>
                                <span className={styles.questionLabel}>Question B</span>
                            </div>
                            <p className={styles.questionText}>{currentQuestionSet.questionB}</p>
                            <div className={styles.answerLabel}>Answer:</div>

                            {Array.isArray(currentAnswers.b) ? (
                                // Handle array of code blocks with individual clipboard buttons
                                currentAnswers.b.map((block, index) => (
                                    <div key={index} className={styles.codeBlockContainer}>
                                        <div className={styles.codeBlockHeader}>
                                            <span className={styles.codeBlockTitle}>{block.title}</span>
                                            <button
                                                onClick={() => copyCodeBlock(block.code, `b-${index}`)}
                                                className={`${styles.copyButton} ${styles.smallCopyButton} ${copiedBlocks[`b-${index}`] ? styles.copied : ''}`}
                                            >
                                                <svg className={styles.copyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    {copiedBlocks[`b-${index}`] ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    ) : (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    )}
                                                </svg>
                                                {copiedBlocks[`b-${index}`] ? 'Copied!' : 'Copy'}
                                            </button>
                                        </div>
                                        <pre className={styles.codeBlock}><code>{block.code}</code></pre>
                                    </div>
                                ))
                            ) : (
                                // Handle single string format (backward compatibility)
                                <>
                                    <button
                                        onClick={() => copyToClipboard(currentAnswers.b, 'b')}
                                        className={`${styles.copyButton} ${copiedB ? styles.copied : ''}`}
                                    >
                                        <svg className={styles.copyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {copiedB ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            )}
                                        </svg>
                                        {copiedB ? 'Copied!' : 'Copy Answer'}
                                    </button>
                                    <pre className={styles.codeBlock}><code>{currentAnswers.b}</code></pre>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyStateIcon}>📝</div>
                        <p className={styles.emptyStateText}>
                            Please select a set number to view questions and answers
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
