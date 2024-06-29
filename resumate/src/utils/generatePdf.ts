import { jsPDF } from "jspdf";

const generatePdf = (resumeText: string) => {
  const doc = new jsPDF();

  const hexColor = "EFE3F3";
  const rgbColor = parseInt(hexColor, 16);
  const r = (rgbColor >> 16) & 255;
  const g = (rgbColor >> 8) & 255;
  const b = rgbColor & 255;

  doc.setFillColor(r, g, b);
  doc.rect(
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight(),
    "F"
  );

  const marginLeft = 10;
  const marginRight = 10;
  const marginTop = 10;
  const lineHeight = 10;

  const pageWidth = doc.internal.pageSize.getWidth(); // max text width for margin
  const maxTextWidth = pageWidth - marginLeft - marginRight;

  const lines = doc.splitTextToSize(resumeText, maxTextWidth); // add data with margin
  let yPosition = marginTop;

  lines.forEach((line: string | string[]) => {
    doc.text(line, marginLeft, yPosition);
    yPosition += lineHeight;
  });

  const pdfBlob = doc.output("blob");
  return URL.createObjectURL(pdfBlob);
};

export default generatePdf;
