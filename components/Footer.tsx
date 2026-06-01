import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Image
            src="/Logowithword.png"
            alt="CHANCE – Chest Automated Nodule Detection for Early Screening"
            width={240}
            height={72}
            style={{ objectFit: 'contain' }}
          />
          <div className="footer-desc">
            Chest Automated Nodule Detection for Early Screening, AI-powered CXR nodule detection system using Deep Learning for real-time inference.
          </div>
        </div>
        <div className="footer-col">
          <h4>Product</h4>
          <Link href="/scan">Scan</Link>
          <Link href="/download">Download App</Link>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <a href="#">Documentation (coming soon)</a>
          <a href="#">API Reference (coming soon)</a>
          <a href="#">Model Architecture (coming soon)</a>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Medical Disclaimer</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {year} CHANCE Detection Systems. All rights reserved.
        <span style={{ opacity: 0.5, marginLeft: 6 }}></span>
      </div>
    </footer>
  );
}
