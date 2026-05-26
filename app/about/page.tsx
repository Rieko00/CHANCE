import { Stethoscope, BookOpen, Target, Users, Code2 } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="home-page">
      <section className="section" style={{ paddingTop: '5rem' }}>
        <div className="section-inner" style={{ maxWidth: 820 }}>
          <div className="section-tag">About</div>
          <h1 className="section-title">About CHANCE</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            <strong style={{ color: 'var(--text-primary)' }}>CHANCE</strong> (Chest Automated Nodule Detection for Early Screening) is a research-grade web application for detecting nodule masses in chest X-ray (CXR) scans using a custom-trained YOLOv8 model exported to ONNX format.
          </p>

          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {[
              { icon: Target, title: 'Goal', desc: 'Assist radiologists in early-stage lung cancer screening through AI-assisted nodule mass detection on CXR scans.' },
              { icon: BookOpen, title: 'Dataset', desc: 'Trained on chest X-ray datasets with expert radiologist annotations for nodule mass detection.' },
              { icon: Code2, title: 'Technology', desc: 'Next.js 16, ONNX Runtime Web, Web Workers for client-side inference, and jsPDF for report generation.' },
              { icon: Users, title: 'Disclaimer', desc: 'For research and educational use only. NOT a clinical decision-support tool. Always consult a radiologist.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="feature-card">
                <div className="feature-icon" style={{ color: 'var(--accent-bright)' }}>
                  <Icon size={24} />
                </div>
                <h3 className="feature-title">{title}</h3>
                <p className="feature-desc">{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>Model Details</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <tbody>
                {[
                  ['Architecture', 'YOLOv8 (custom)'],
                  ['Export Format', 'ONNX'],
                  ['Input Size', '640 × 640 px'],
                  ['Classes', 'nodule_mass (1 class)'],
                  ['Scan Type', 'Chest X-Ray (CXR)'],
                  ['NMS IoU Threshold', '0.45'],
                  ['Default Confidence', '0.50'],
                ].map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 0', color: 'var(--text-muted)', width: '40%' }}>{k}</td>
                    <td style={{ padding: '10px 0', color: 'var(--text-primary)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 500 }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link href="/scan" className="btn-primary" style={{ fontSize: '0.95rem' }}>
              Try the Scanner →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
