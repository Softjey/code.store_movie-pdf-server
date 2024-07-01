import { Injectable } from '@nestjs/common';
import { jsPDF } from 'jspdf';

@Injectable()
export class PdfService {
  async generateBuffer(constructor: (pdf: jsPDF) => void | Promise<void>) {
    const pdf = new jsPDF();

    await constructor(pdf);

    const arrayBuffer = pdf.output('arraybuffer');

    return Buffer.from(arrayBuffer);
  }

  async getBase64FromUrl(url: string) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

    return Buffer.from(arrayBuffer).toString('base64');
  }
}
