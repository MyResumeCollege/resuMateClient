import { jsPDF } from "jspdf";

const generatePdf = (resumeText: string, fileName: string = "resume.pdf") => {
  const doc = new jsPDF();

  // Convert hex color to RGB
  const hexColor = "EFE3F3";
  const rgbColor = parseInt(hexColor, 16);
  const r = (rgbColor >> 16) & 255;
  const g = (rgbColor >> 8) & 255;
  const b = rgbColor & 255;

  // Set background color to hex color
  doc.setFillColor(r, g, b);
  doc.rect(
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight(),
    "F"
  );

  // Add the resume text to the PDF
  doc.text(resumeText, 10, 10);

  // Save the generated PDF
  doc.save(fileName);
};

export default generatePdf;
