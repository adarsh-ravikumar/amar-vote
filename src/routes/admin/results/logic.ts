import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function GeneratePDF() {
	const pdfDoc = await PDFDocument.create();
	const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
	const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

	const page = pdfDoc.addPage();
	const { width, height } = page.getSize();
	const fontSize = 30;
	page.drawText('Results And Analysis', {
		x: width / 2,
		y: height - 4 * fontSize,
		size: fontSize,
		font: timesRomanBold,
        
		color: rgb(0, 0, 0)
	});

	const pdfBytes = await pdfDoc.save();
}
