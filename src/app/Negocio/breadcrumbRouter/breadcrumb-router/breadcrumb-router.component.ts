import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumb-router',
  imports: [ RouterModule,Breadcrumb,FormsModule,
    ReactiveFormsModule,CommonModule      ],
  templateUrl: './breadcrumb-router.component.html',
  styleUrl: './breadcrumb-router.component.scss',
  standalone: true,
})
export class BreadcrumbRouterComponent implements OnInit {
  @Input() items: MenuItem[] = [];
 
   constructor() {}
 
   ngOnInit(): void {
     
     
   }
 

}
