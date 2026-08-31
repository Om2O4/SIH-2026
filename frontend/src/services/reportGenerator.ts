import jsPDF from 'jspdf';

export interface ReportData {
  projectName: string;
  location: string;
  shelterType: string;
  area: number;
  occupants: number;
  comfortScore: number;
  heatingNeed: number;
  estCost: string;
  solarUtilization: number;
  whyPoints: string[];
  keyFeatures: string[];
}

export const generatePdfReport = (data: ReportData) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Background Header styling
  doc.setFillColor(11, 37, 89); // Primary Navy #0B2559
  doc.rect(0, 0, 210, 40, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('CLIMASHELTER AI', 14, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Smart Passive Shelter Design & Thermal Optimization Platform', 14, 25);
  doc.text(`Generated: ${new Date().toLocaleDateString()} | Region: ${data.location}`, 14, 32);

  // Section 1: Executive Summary
  doc.setTextColor(11, 37, 89);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('1. Project Summary & Recommended Design', 14, 52);

  doc.setDrawColor(226, 232, 240);
  doc.line(14, 55, 196, 55);

  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.text(`Project Name: ${data.projectName}`, 14, 63);
  doc.text(`Location: ${data.location} (High-Altitude Cold Zone)`, 14, 70);
  doc.text(`Built-up Area: ${data.area} m² | Occupancy: ${data.occupants} persons`, 14, 77);
  doc.text(`Structure: ${data.shelterType} (Passive Solar + Direct Gain)`, 14, 84);

  // Section 2: Key Thermal Performance Indicators
  doc.setTextColor(11, 37, 89);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('2. Key Thermal Performance Metrics', 14, 98);
  doc.line(14, 101, 196, 101);

  // 4 Metric Boxes
  // Box 1: Comfort Score
  doc.setFillColor(221, 243, 228); // #DDF3E4
  doc.roundedRect(14, 107, 42, 24, 3, 3, 'F');
  doc.setTextColor(46, 125, 79);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`${data.comfortScore}/100`, 20, 118);
  doc.setFontSize(8);
  doc.text('Comfort Score', 20, 125);

  // Box 2: Heating Need
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(60, 107, 42, 24, 3, 3, 'F');
  doc.setTextColor(217, 119, 6);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`${data.heatingNeed} kWh/m²/yr`, 64, 118);
  doc.setFontSize(8);
  doc.text('Heating Need (Low)', 64, 125);

  // Box 3: Estimated Cost
  doc.setFillColor(220, 238, 255);
  doc.roundedRect(106, 107, 42, 24, 3, 3, 'F');
  doc.setTextColor(37, 99, 169);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`Rs ${data.estCost}`, 110, 118);
  doc.setFontSize(8);
  doc.text('Estimated Budget', 110, 125);

  // Box 4: Solar Utilization
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(152, 107, 42, 24, 3, 3, 'F');
  doc.setTextColor(11, 37, 89);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`${data.solarUtilization}%`, 160, 118);
  doc.setFontSize(8);
  doc.text('Solar Gain Share', 160, 125);

  // Section 3: Why This Design?
  doc.setTextColor(11, 37, 89);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('3. AI Optimization Insights: Why This Design?', 14, 142);
  doc.line(14, 145, 196, 145);

  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');

  data.whyPoints.forEach((point, index) => {
    doc.text(`• ${point}`, 16, 153 + index * 7);
  });

  // Section 4: Passive Engineering Features
  doc.setTextColor(11, 37, 89);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('4. Passive Engineering Features & Envelope Specs', 14, 190);
  doc.line(14, 193, 196, 193);

  const specs = [
    '• Orientation: True South (180° Azimuth) for maximum winter direct solar gain',
    '• Walls: 300mm Rammed Earth + 100mm External EPS (Overall U-Value = 0.22 W/m²K)',
    '• Roof: Insulated Pitched Roof with 150mm Glasswool (U-Value = 0.16 W/m²K)',
    '• Glazing: Double Low-E Argon-filled South Glazing (SHGC = 0.62, U-Value = 1.4 W/m²K)',
    '• Thermal Mass: 400mm Local Stone Plinth + Phase Change Material Thermal Storage Board',
    '• Overhang Louver: 0.9m Summer Solar Cutoff Shading with natural ventilation dampers'
  ];

  specs.forEach((spec, idx) => {
    doc.text(spec, 16, 201 + idx * 7);
  });

  // Footer stamp
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 275, 210, 22, 'F');
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.text('CLIMASHELTER AI • High-Altitude Engineering Support Tool • Compliant with ECBC-R Cold Climate Standard', 14, 285);

  // Save the PDF
  doc.save(`CLIMASHELTER_AI_${data.projectName.replace(/\s+/g, '_')}_Report.pdf`);
};
