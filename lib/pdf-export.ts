/**
 * PDF Export Service untuk CHANCE – Chest Automated Nodule Detection for Early Screening
 * Menggunakan jsPDF + jspdf-autotable (client-side only).
 */

import type { Detection, FileResult } from './types';

const CLASS_COLORS_HEX: Record<string, { r: number; g: number; b: number }> = {
  nodule_mass: { r: 245, g: 158, b: 11 },
};

function fmtDate(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}  ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

async function toBase64Jpeg(src: string): Promise<string> {
  const img = await loadImage(src);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/jpeg', 0.88);
}

export async function exportResultsToPdf(results: FileResult[]): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const autoTable = (await import('jspdf-autotable')).default;

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentW = pageW - margin * 2;

  const allDetections = results.flatMap((r) => r.detections ?? []);
  const totalNoduleMass = allDetections.filter((d) => d.class === 'nodule_mass').length;
  const imagesWithNodule = results.filter((r) => (r.detections ?? []).length > 0).length;
  const imagesClean = results.filter((r) => (r.detections ?? []).length === 0).length;

  // PAGE 1 — COVER
  let y = margin;

  // Emerald accent bar top
  doc.setFillColor(5, 150, 105);
  doc.rect(margin, y, contentW, 1.2, 'F');
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(6, 78, 59);
  doc.text('Laporan Deteksi Nodul Paru-Paru (CXR)', margin, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text('CHANCE – CXR Nodule Scanner  •  YOLOv8', margin, y);
  y += 6;

  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(`Tanggal: ${fmtDate()}`, margin, y);
  y += 12;

  doc.setDrawColor(167, 243, 208);
  doc.line(margin, y, pageW - margin, y);
  y += 10;

  // Summary box
  const boxH = 44;
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(margin, y, contentW, boxH, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(6, 78, 59);
  doc.text('Ringkasan', margin + 6, y + 10);

  const stats = [
    { label: 'Total Gambar', value: String(results.length),       color: [5, 150, 105]   as [number,number,number] },
    { label: 'Total Nodul',  value: String(allDetections.length), color: [220, 38, 38]   as [number,number,number] },
    { label: 'Dengan Nodul', value: String(imagesWithNodule),     color: [245, 158, 11]  as [number,number,number] },
    { label: 'Bersih',       value: String(imagesClean),          color: [34, 197, 94]   as [number,number,number] },
  ];
  const statW = contentW / stats.length;
  stats.forEach((s, i) => {
    const sx = margin + i * statW + statW / 2;
    const sy = y + 24;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(...s.color);
    doc.text(s.value, sx, sy, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(s.label, sx, sy + 7, { align: 'center' });
  });
  y += boxH + 10;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  doc.text('Detail hasil deteksi pada halaman berikutnya.', margin, y);
  y += 16;

  // File list table
  if (results.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(6, 78, 59);
    doc.text('Daftar File', margin, y);
    y += 4;

    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [['#', 'Nama File', 'Nodul Mass', 'Status']],
      body: results.map((r, i) => {
        const dets = r.detections ?? [];
        return [
          i + 1,
          r.file.name,
          dets.filter((d) => d.class === 'nodule_mass').length,
          r.status === 'done' ? 'Selesai' : r.status === 'error' ? 'Error' : r.status,
        ];
      }),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [5, 150, 105], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [236, 253, 245] },
    });
  }

  // PER-IMAGE DETAIL PAGES
  for (let idx = 0; idx < results.length; idx++) {
    const result = results[idx];
    if (result.status !== 'done') continue;

    doc.addPage();
    y = margin;

    doc.setFillColor(5, 150, 105);
    doc.rect(margin, y, contentW, 1.2, 'F');
    y += 8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(6, 78, 59);
    doc.text(`Gambar #${idx + 1}: ${result.file.name}`, margin, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    const dets = result.detections ?? [];
    doc.text(`Nodul terdeteksi: ${dets.length}  |  Nodule Mass: ${dets.filter(d => d.class==='nodule_mass').length}`, margin, y);
    y += 7;

    const imgSrc = result.annotatedUrl ?? result.imageUrl;
    if (imgSrc) {
      try {
        const b64 = await toBase64Jpeg(imgSrc);
        const ow = result.origWidth ?? 640;
        const oh = result.origHeight ?? 640;
        const maxImgW = contentW;
        const maxImgH = 120;
        const scale = Math.min(maxImgW / ow, maxImgH / oh);
        const dw = ow * scale;
        const dh = oh * scale;
        doc.addImage(b64, 'JPEG', margin, y, dw, dh);
        y += dh + 6;
      } catch {
        doc.setFontSize(9);
        doc.setTextColor(220, 38, 38);
        doc.text('[Gambar tidak tersedia]', margin, y);
        y += 8;
      }
    }

    if (dets.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(6, 78, 59);
      doc.text('Nodul Terdeteksi', margin, y);
      y += 3;

      autoTable(doc, {
        startY: y,
        margin: { left: margin, right: margin },
        head: [['#', 'Klasifikasi', 'Confidence', 'x1', 'y1', 'x2', 'y2']],
        body: dets.map((det, i) => {
          const c = CLASS_COLORS_HEX[det.class] ?? { r: 100, g: 100, b: 100 };
          return [
            { content: i + 1, styles: { textColor: [71, 85, 105] as [number,number,number] } },
            { content: 'Nodule Mass', styles: { textColor: [c.r, c.g, c.b] as [number,number,number], fontStyle: 'bold' } },
            { content: `${(det.confidence * 100).toFixed(1)}%`, styles: { textColor: [71, 85, 105] as [number,number,number] } },
            Math.round(det.x1), Math.round(det.y1), Math.round(det.x2), Math.round(det.y2),
          ];
        }),
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [6, 78, 59], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [236, 253, 245] },
      });
    } else {
      doc.setFillColor(236, 253, 245);
      doc.setDrawColor(167, 243, 208);
      doc.roundedRect(margin, y, contentW, 14, 3, 3, 'FD');
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(5, 150, 105);
      doc.text('Tidak ada nodul terdeteksi pada gambar ini.', margin + 5, y + 9);
      y += 18;
    }

    const pageNum = doc.internal.pages.length - 1;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('CHANCE – CXR Nodule Scanner  •  Bukan untuk penggunaan klinis', margin, pageH - 8);
    doc.text(`Hal. ${pageNum}`, pageW - margin, pageH - 8, { align: 'right' });
  }

  const timestamp = Date.now();
  doc.save(`laporan_deteksi_cxr_nodule_${timestamp}.pdf`);
}
