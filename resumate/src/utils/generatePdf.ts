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

  doc.setProperties({
    title: 'Resume',
  });

  const marginLeft = 10;
  const marginRight = 10;
  const marginTop = 10;
  const lineHeight = 10;

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxTextWidth = pageWidth - marginLeft - marginRight;

  const lines = doc.splitTextToSize(resumeText, maxTextWidth);
  let yPosition = marginTop;

  lines.forEach((line: string | string[]) => {
    if (yPosition + lineHeight > pageHeight - marginTop) {
      doc.addPage();
      doc.setFillColor(r, g, b);
      doc.rect(
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight(),
        "F"
      );
      yPosition = marginTop;
    }
    doc.text(line, marginLeft, yPosition);
    yPosition += lineHeight;
  });

  const pdfBlob = doc.output("blob");
  return URL.createObjectURL(pdfBlob);
};

export default generatePdf;
