import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">

        <a href="https://www.transener.com.ar/" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Transener</a>
        <a href="https://www.transba.com.ar/" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Transba</a>&copy; 2023 - Todos los derechos reservados

    </div>`
})
export class AppFooter {}
