/* eslint-disable @typescript-eslint/naming-convention */
const CONTENT_TYPE = {
  MSEXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export class FileUtil {
  static base64ToBlob(base64: string, contentType = '', sliceSize = 512): Blob {
    base64 = base64.replace(/\s/g, '');
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  static base64ToBlobExcel(base64: string): Blob {
    return this.base64ToBlob(base64, CONTENT_TYPE.MSEXCEL);
  }

  static download(file: Blob, fileName: string): void {
    const filePath = window.URL.createObjectURL(file);
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  static downloadExcel(base64: string, fileName: string): void {
    const dataBlob = this.base64ToBlobExcel(base64);
    this.download(dataBlob, fileName);
  }
}
