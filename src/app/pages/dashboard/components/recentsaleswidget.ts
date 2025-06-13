import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
export interface OE {
    codigo: string;
    fecha: string;
    laboratorio: string;
}
@Component({
    standalone: true,
    selector: 'app-recent-sales-widget',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule],
    template: `<div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Ordenes Recientes</div>
        <p-table [value]="oe" [paginator]="true" [rows]="5" responsiveLayout="scroll">
            <ng-template #header>
                <tr>
                   
                    <th pSortableColumn="name">Codigo <p-sortIcon field="name"></p-sortIcon></th>
                    <th pSortableColumn="price">Fecha <p-sortIcon field="price"></p-sortIcon></th>
                    <th pSortableColumn="laboratorio">Lab <p-sortIcon field="laboratorio"></p-sortIcon></th>
                    <th>View</th>
                </tr>
            </ng-template>
            <ng-template #body let-product>
                <tr>
                    
                    <td style="width: 35%; min-width: 7rem;">{{ product.codigo }}</td>
                    <td style="width: 35%; min-width: 8rem;">{{ product.fecha}}</td>
                    <td style="width: 15%; min-width: 8rem;">{{ product.laboratorio }}</td>
                    <td style="width: 15%;">
                        <button pButton (click)="ir()" pRipple type="button" icon="pi pi-search" class="p-button p-component p-button-text p-button-icon-only"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>`,
    providers: [ProductService]
})
export class RecentSalesWidget {
    oe: OE[] = [
        { codigo: 'OE-1', fecha: '13-06/2025', laboratorio: 'Ezeiza' },
        { codigo: 'OE-2', fecha: '13-06/2025', laboratorio: 'Ezeiza' },
        { codigo: 'OE-3', fecha: '13-06/2025', laboratorio: 'Ezeiza' },
        { codigo: 'OE-4', fecha: '13-06/2025', laboratorio: 'Ezeiza' },
        { codigo: 'OE-5', fecha: '13-06/2025', laboratorio: 'Ezeiza' },
    ];
    products!: Product[];

    constructor(private productService: ProductService,private route:Router) {}

    ngOnInit() {


        this.productService.getProductsSmall().then((data) => (this.products = data));
    }
    ir()
    { this.route.navigate(['/ordenEnsayo/3']);}
}
