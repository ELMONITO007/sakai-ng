import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputIconModule } from 'primeng/inputicon';

@Component({
    selector: 'app-orden-ensayo-qr',
    imports: [QRCodeComponent, ButtonModule, InputIconModule],
    providers: [QRCodeComponent],
    templateUrl: './orden-ensayo-qr.component.html',
    styleUrl: './orden-ensayo-qr.component.scss'
})
export class OrdenEnsayoQRComponent implements OnInit {
  id: number;
    qrCodeValue: string;
@ViewChild('qrCode', { read: ElementRef }) private qrCodeElement!: ElementRef;
    constructor(
     public ref: DynamicDialogRef, 
        public config: DynamicDialogConfig,
 private elementRef: ElementRef
    ) {}

    ngOnInit(): void {
        this.id = this.config.data['id'];
        this.qrCodeValue = 'http://localhost:4200/ordenEnsayo/' + this.config.data['id'];
    }

  print() {
        const parentElement = this.qrCodeElement.nativeElement;

    // 2. Busca el elemento 'img' o 'canvas' dentro del componente QR.
    // Las versiones más nuevas de la librería prefieren renderizar una 'img' por defecto.
    const qrImage = parentElement.querySelector('img');
    const qrCanvas = parentElement.querySelector('canvas');
    let imageDataUrl = '';

    if (qrImage) {
      // Si encuentra una imagen, su 'src' ya es la URL de datos que necesitamos.
      imageDataUrl = qrImage.src;
    } else if (qrCanvas) {
      // Si es un canvas (menos común ahora), lo convertimos a URL de datos.
      imageDataUrl = qrCanvas.toDataURL('image/png');
    } else {
      console.error("No se pudo encontrar el elemento <img> o <canvas> del código QR.");
      return;
    }

    // 3. Crea el enlace temporal para la descarga (esto sigue igual).
    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = `${this.qrCodeValue}.png`; // Nombre del archivo a descargar

    // 4. Simula el clic para iniciar la descarga.
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    }
}
