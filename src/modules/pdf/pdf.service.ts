import { Injectable } from '@nestjs/common';
import { jsPDF } from 'jspdf';

@Injectable()
export class PdfService {
  generateBuffer(constructor: (pdf: jsPDF) => void) {
    const pdf = new jsPDF();

    constructor(pdf);

    const arrayBuffer = pdf.output('arraybuffer');

    return Buffer.from(arrayBuffer);
  }
}
