'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import { algorithmsData } from '../data/questions';
import { answersData } from '../data/answers';

const LOG_MESSAGES = [
    { p: 0, text: "[SYS_INIT] Initializing system security audit shell..." },
    { p: 5, text: "[SYS_INIT] Establishing secure socket on virtual node 127.0.0.19..." },
    { p: 10, text: "[WARN] Directory protection triggers bypassed..." },
    { p: 15, text: "[INFO] Launching decryption brute-force simulation..." },
    { p: 22, text: "[INFO] SHA-256 decryption key rotation in progress..." },
    { p: 30, text: "[ALERT] Intrusion signature detected by host firewall..." },
    { p: 38, text: "[WARN] Port scanning response delayed. Forcing parallel channels..." },
    { p: 45, text: "[INFO] Checking user credentials against system registry..." },
    { p: 52, text: "[ERROR] Decryption mismatch detected in passcode buffer block 2..." },
    { p: 60, text: "[INFO] Forcing override sequence command stream..." },
    { p: 68, text: "[CRITICAL] TRAP SIG: 'CHADUVUKONDI FIRST U' ENCOUNTERED" },
    { p: 76, text: "[ALERT] Running payload dump of localized memory..." },
    { p: 84, text: "[CRITICAL] MEME DETECTED. PREVENTING FURTHER SITE ACCESS" },
    { p: 92, text: "[FATAL] DECRYPTION FAILED. SYSTEM SECURITY TAMPER INHIBITOR ARMED" },
    { p: 100, text: "[FATAL] ACCESS DENIED. INTRUDER BLOCK INITIATED" }
];

function MatrixRain({ color = '#10b981', opacity = 0.12 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const handleResize = () => {
            if (canvas) {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }
        };
        window.addEventListener('resize', handleResize);

        const alphabet = "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ🤖💻🔥⚠️🚫👾";
        const fontSize = 14;
        const columns = Math.floor(width / fontSize);

        const rainDrops = Array(columns).fill(1);

        const draw = () => {
            ctx.fillStyle = color === '#10b981' ? 'rgba(7, 10, 18, 0.08)' : 'rgba(10, 2, 2, 0.08)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = color;
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, [color]);

    return (
        <canvas 
            ref={canvasRef} 
            style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                opacity: opacity, 
                pointerEvents: 'none', 
                zIndex: 1 
            }} 
        />
    );
}

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [showTryAgain, setShowTryAgain] = useState(false);
    const [lockMessage, setLockMessage] = useState('');
    const [lockStatusClass, setLockStatusClass] = useState('');
    const [progressPercent, setProgressPercent] = useState(0);
    const [selectedSetId, setSelectedSetId] = useState('set1');
    const [selectedPartIndex, setSelectedPartIndex] = useState(0);
    const [copied, setCopied] = useState(false);
    const [activeSubTab, setActiveSubTab] = useState(0); // For parts with multiple implementations
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handlePasscodeSubmit = (e) => {
        e.preventDefault();
        if (isVerifying) return;

        if (passcode === '2203') {
            setIsAuthenticated(true);
            setLockMessage('');
            setLockStatusClass('');
            setShowTryAgain(false);
        } else {
            setIsVerifying(true);
            setShowTryAgain(false);
            setPasscode('');
            setProgressPercent(0);
            
            // Progress Bar interval incrementing to 100% over 5 seconds
            const interval = setInterval(() => {
                setProgressPercent(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 50);
            
            setLockMessage('🔄 Unlocking the content...');
            setLockStatusClass(styles.lockStatusUnlocking);
            
            setTimeout(() => {
                setLockMessage('⏳ Hold On...');
                setLockStatusClass(styles.lockStatusHold);
            }, 1200);
            
            setTimeout(() => {
                setLockMessage('🤔 Wait a Minute...');
                setLockStatusClass(styles.lockStatusWait);
            }, 2400);
            
            setTimeout(() => {
                setLockMessage('📖 chaduvukora First U endira ee panulu');
                setLockStatusClass(styles.lockStatusMeme);
            }, 3600);
            
            setTimeout(() => {
                setLockMessage('❌ Wrong Password Contact Owner');
                setLockStatusClass(styles.lockStatusError);
                setIsVerifying(false);
                setShowTryAgain(true);
            }, 5000);
        }
    };

    const handleSetSelect = (setId) => {
        setSelectedSetId(setId);
        setSelectedPartIndex(0);
        setActiveSubTab(0);
        setCopied(false);
        setIsSidebarOpen(false); // Close sidebar drawer on set click (mobile)
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

    // Direct PDF Generation and Download (no colorful borders, compact flow, no outputs)
    const handlePrintAll = () => {
        if (isGeneratingPdf) return;
        setIsGeneratingPdf(true);

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        
        script.onload = () => {
            const opt = {
                margin:       [12, 12, 12, 12], // Margins to maximize page space usage
                filename:     'AIML_Lab_Manual.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, logging: false },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            const element = document.createElement('div');
            
            const escapeHtml = (text) => {
                return text
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            };

            let htmlContent = `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 5px; color: #000000; background-color: #ffffff; line-height: 1.4; font-size: 12px;">
                    <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000000; padding-bottom: 10px;">
                        <h1 style="margin: 0; color: #000000; font-size: 20px; font-weight: bold;">Artificial Intelligence & Machine Learning</h1>
                        <h2 style="margin: 3px 0 0 0; color: #000000; font-size: 14px; font-weight: bold;">Lab Manual</h2>
                        <div style="margin: 3px 0 0 0; color: #475569; font-size: 10px; font-weight: 500;">Regulation R21 - VI Semester</div>
                    </div>
            `;

            algorithmsData.forEach((set) => {
                htmlContent += `
                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 14px; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 10px; font-weight: bold;">
                            ${set.name}: ${set.description}
                        </div>
                `;
                
                set.parts.forEach(part => {
                    htmlContent += `
                        <div style="margin-bottom: 15px;">
                            <div style="font-size: 11px; color: #000000; font-weight: bold; margin-bottom: 3px;">
                                ${part.fullName}
                            </div>
                            <div style="font-size: 10px; color: #475569; margin-bottom: 6px; background-color: #f8fafc; padding: 5px 8px; border-left: 2px solid #475569; border-radius: 2px;">
                                ${part.description}
                            </div>
                    `;
                    
                    const answer = answersData[part.id];
                    if (answer) {
                        if (Array.isArray(answer)) {
                            answer.forEach(sub => {
                                htmlContent += `
                                    <div style="font-size: 9px; text-transform: uppercase; color: #475569; margin-top: 5px; margin-bottom: 3px; font-weight: bold;">
                                        Code: ${sub.title}
                                    </div>
                                    <pre style="background-color: #f8fafc; color: #000000; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; font-family: monospace; font-size: 9.5px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; word-break: break-all; margin: 0 0 6px 0; line-height: 1.25;">${escapeHtml(sub.code)}</pre>
                                `;
                            });
                        } else {
                            htmlContent += `
                                <div style="font-size: 9px; text-transform: uppercase; color: #475569; margin-top: 5px; margin-bottom: 3px; font-weight: bold;">
                                    Code Implementation
                                </div>
                                <pre style="background-color: #f8fafc; color: #000000; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; font-family: monospace; font-size: 9.5px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; word-break: break-all; margin: 0; line-height: 1.25;">${escapeHtml(answer.code)}</pre>
                            `;
                        }
                    }
                    htmlContent += `</div>`;
                });
                
                htmlContent += `</div>`;
            });

            htmlContent += `</div>`;
            element.innerHTML = htmlContent;
            
            // Generate and save the PDF directly to download
            window.html2pdf().from(element).set(opt).save().then(() => {
                setIsGeneratingPdf(false);
                document.body.removeChild(script);
            }).catch(err => {
                console.error("PDF generation error:", err);
                setIsGeneratingPdf(false);
                document.body.removeChild(script);
            });
        };

        script.onerror = () => {
            console.error("Failed to load html2pdf script from CDN");
            setIsGeneratingPdf(false);
            alert("Failed to load PDF library. Please check your internet connection.");
        };

        document.body.appendChild(script);
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

    // Passcode Lock Screen Takeover Layout
    if (!isAuthenticated) {
        if (isVerifying) {
            return (
                <div className={styles.hackerTakeoverScreen}>
                    <MatrixRain color="#10b981" opacity={0.12} />
                    <div className={styles.scannerGlow}></div>
                    <div className={styles.terminalWindow}>
                        <div className={styles.terminalHeader}>
                            <span className={styles.dot} style={{ backgroundColor: '#ef4444' }}></span>
                            <span className={styles.dot} style={{ backgroundColor: '#fbbf24' }}></span>
                            <span className={styles.dot} style={{ backgroundColor: '#10b981' }}></span>
                            <span className={styles.terminalTitle}>SECURE_PORTAL_SCANNER.exe</span>
                        </div>
                        <div className={styles.terminalBody}>
                            <div className={styles.scanLine}></div>
                            <div className={`${styles.glitchTakeoverText} ${lockStatusClass}`} data-text={lockMessage}>
                                {lockMessage}
                            </div>
                            <div className={styles.progressContainer}>
                                <div 
                                    className={styles.progressBar} 
                                    style={{ width: `${progressPercent}%` }} 
                                />
                                <div className={styles.progressText}>
                                    SCANNING_HASH_STREAM... {progressPercent}%
                                </div>
                            </div>
                            <div className={styles.terminalLogs}>
                                {LOG_MESSAGES.filter(log => progressPercent >= log.p).map((log, index) => (
                                    <div 
                                        key={index} 
                                        style={{ 
                                            color: log.text.includes('FATAL') || log.text.includes('CRITICAL') 
                                                ? '#ef4444' 
                                                : log.text.includes('WARN') || log.text.includes('ALERT') 
                                                    ? '#fbbf24' 
                                                    : '#10b981' 
                                        }}
                                    >
                                        {log.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (showTryAgain) {
            return (
                <div className={styles.accessDeniedTakeoverScreen}>
                    <MatrixRain color="#ef4444" opacity={0.12} />
                    <div className={styles.scannerGlowRed}></div>
                    <div className={styles.terminalWindowRed}>
                        <div className={styles.terminalHeaderRed}>
                            <span className={styles.dotRed} style={{ backgroundColor: '#ef4444' }}></span>
                            <span className={styles.dotRed} style={{ backgroundColor: '#fbbf24' }}></span>
                            <span className={styles.dotRed} style={{ backgroundColor: '#10b981' }}></span>
                            <span className={styles.terminalTitleRed}>ACCESS_DENIED.err</span>
                        </div>
                        <div className={styles.terminalBody}>
                            <div className={styles.scanLineRed}></div>
                            <div className={styles.vibratingIcon}>🚫</div>
                            <h2 className={styles.glitchTakeoverTextRed} data-text="SYSTEM LOCKOUT">
                                SYSTEM LOCKOUT
                            </h2>
                            <p 
                                className={`${styles.lockStatusMessage} ${styles.lockStatusError}`}
                                data-text={lockMessage}
                                style={{ width: '100%', maxWidth: '550px', margin: '1.25rem auto' }}
                            >
                                {lockMessage}
                            </p>
                            
                            <div className={styles.terminalLogsRed}>
                                <div>[SYS_FATAL] INVALID AUTHORIZATION CODE RECEIVED.</div>
                                <div>[SYS_FATAL] SHIELD PROTECTION LOGGED THREAT SIGNATURE: "INTRUDER".</div>
                                <div>[SYS_FATAL] TARGET IP RECORDED & BACKUP SECURITY SCHEMAS EXECUTED.</div>
                                <div style={{ color: '#ef4444', fontWeight: 'bold' }}>[SYS_FATAL] ACCESS REVOKED. CONTACT SYSTEM OWNER IMMEDIATELY.</div>
                            </div>

                            <button 
                                onClick={() => {
                                    setShowTryAgain(false);
                                    setLockMessage('');
                                    setLockStatusClass('');
                                    setPasscode('');
                                }} 
                                className={styles.lockButtonRed}
                            >
                                🔄 Try Again
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

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
                                className={styles.lockInput}
                                autoFocus
                            />
                            <button type="submit" className={styles.lockButton}>
                                Unlock Portal
                            </button>
                        </form>
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
                {/* Backdrop overlay for Mobile Drawer */}
                {isSidebarOpen && (
                    <div 
                        className={styles.sidebarOverlay} 
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar Navigation */}
                <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
                    <div className={styles.sidebarHeader}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span className={styles.sidebarLogo}>🤖</span>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>AIML Lab Portal</div>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Regulation R21 - VI Sem</div>
                            </div>
                        </div>
                        {/* Close button for Mobile */}
                        <button 
                            onClick={() => setIsSidebarOpen(false)}
                            className={styles.closeSidebarButton}
                        >
                            ✕
                        </button>
                    </div>

                    {/* PDF Compile Button */}
                    <div style={{ padding: '1rem 0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <button 
                            onClick={handlePrintAll} 
                            disabled={isGeneratingPdf}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: 'none',
                                borderRadius: '10px',
                                background: isGeneratingPdf 
                                    ? '#334155' 
                                    : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                                color: isGeneratingPdf ? '#94a3b8' : 'white',
                                fontSize: '0.85rem',
                                fontWeight: '700',
                                cursor: isGeneratingPdf ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                boxShadow: isGeneratingPdf ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.3)',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => {
                                if (!isGeneratingPdf) {
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.5)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!isGeneratingPdf) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
                                }
                            }}
                        >
                            <span>📄</span>
                            <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download All Q&A (PDF)'}</span>
                        </button>
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {/* Hamburger Menu Toggle Button on Mobile */}
                            <button 
                                onClick={() => setIsSidebarOpen(true)}
                                className={styles.menuButton}
                            >
                                ☰
                            </button>
                            <div style={{ textAlign: 'left' }}>
                                <h1 className={styles.dashboardTitle}>{currentSet.name}</h1>
                                <p className={styles.dashboardSubtitle}>{currentSet.description}</p>
                            </div>
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
