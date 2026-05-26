import Link from 'next/link';
import {
  Stethoscope, Scan, Brain, ShieldCheck, Zap, FileImage,
  ArrowRight, Database, Microscope
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'YOLOv8 AI Engine',
    desc: 'State-of-the-art object detection model trained on CXR datasets for precise nodule mass localisation.',
    color: 'var(--accent-bright)',
  },
  {
    icon: FileImage,
    title: 'Multi-Format Support',
    desc: 'Upload CXR images in JPG, PNG, BMP, or raw DICOM (.dcm) format with automatic processing.',
    color: 'var(--nodule-mass)',
  },
  {
    icon: Zap,
    title: 'Real-time Inference',
    desc: 'ONNX Runtime with Web Worker ensures blazing-fast detection directly in your browser.',
    color: 'var(--success)',
  },
  {
    icon: ShieldCheck,
    title: 'Nodule Mass Detection',
    desc: 'Detects nodule masses in chest X-ray scans with confidence scores for transparent clinical reporting.',
    color: 'var(--danger)',
  },
  {
    icon: Database,
    title: 'Batch Processing',
    desc: 'Analyse multiple CXR scans simultaneously with progress tracking and per-scan status overview.',
    color: '#a78bfa',
  },
  {
    icon: Microscope,
    title: 'Annotated Results',
    desc: 'Bounding boxes drawn directly onto CXR images with colour-coded labels, ready for PDF export.',
    color: '#38bdf8',
  },
];

const steps = [
  { num: '01', title: 'Upload', desc: 'Drag & drop your CXR scan (DICOM, PNG, JPG or BMP).' },
  { num: '02', title: 'Detect', desc: 'Hit "Run Detection" and the model infers in seconds.' },
  { num: '03', title: 'Review', desc: 'Inspect annotated results with bounding boxes and export PDF.' },
];

export default function HomePage() {
  return (
    <div className="home-page">

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-badge">
            <ShieldCheck size={14} />
            <span>AI-Powered CXR Analysis</span>
          </div>

          <h1 className="hero-title">
            Advanced <span className="hero-accent">Nodule Mass</span><br />
            Detection for CXR
          </h1>

          <p className="hero-desc">
            CHANCE leverages state-of-the-art deep learning to detect nodule masses
            in chest X-ray scans with high accuracy — supporting DICOM, PNG, JPG and BMP formats.
          </p>

          <div className="hero-actions">
            <Link href="/scan" className="btn-primary hero-cta no-underline" id="hero-scan-btn">
              <Scan size={20} /> Launch Scanner
            </Link>
            <Link href="/about" className="btn-secondary hero-cta no-underline" id="hero-about-btn">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────── */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">Features</div>
          <h2 className="section-title">Everything you need for<br />CXR nodule analysis</h2>
          <div className="features-grid">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="feature-card">
                <div className="feature-icon" style={{ color }}>
                  <Icon size={26} />
                </div>
                <h3 className="feature-title">{title}</h3>
                <p className="feature-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─────────────────────────────────────── */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-tag">Workflow</div>
          <h2 className="section-title">Three steps to detection</h2>
          <div className="steps-row">
            {steps.map(({ num, title, desc }, i) => (
              <div key={num} className="step-card">
                <div className="step-num">{num}</div>
                <h3 className="step-title">{title}</h3>
                <p className="step-desc">{desc}</p>
                {i < steps.length - 1 && <div className="step-arrow" aria-hidden="true"><ArrowRight size={20} /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Detection Class ──────────────────────────────────── */}
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">Classification</div>
          <h2 className="section-title">Detection class</h2>
          <div className="classes-grid" style={{ maxWidth: 480, margin: '0' }}>
            <div className="class-card" style={{ background: 'var(--nodule-mass-bg)', borderColor: 'var(--nodule-mass-border)' }}>
              <div className="class-dot" style={{ background: 'var(--nodule-mass)' }} />
              <h3 className="class-label" style={{ color: 'var(--nodule-mass)' }}>Nodule Mass</h3>
              <p className="class-desc">Suspicious nodular opacity or mass detected in the chest X-ray. Requires clinical correlation and follow-up imaging for definitive diagnosis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-inner">
          <Stethoscope size={40} style={{ color: 'var(--accent-bright)', marginBottom: '1rem' }} />
          <h2 className="cta-title">Ready to analyse your CXR scans?</h2>
          <p className="cta-desc">Upload chest X-ray images and get instant AI-powered analysis.</p>
          <Link href="/scan" className="btn-primary no-underline" id="cta-scan-btn" style={{ fontSize: '1rem', padding: '14px 36px' }}>
            <Scan size={18} /> Launch Scanner
          </Link>
        </div>
      </section>
    </div>
  );
}
