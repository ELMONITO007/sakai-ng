import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'pricing-widget',
    imports: [DividerModule, ButtonModule, RippleModule],
    template: `
        <div id="pricing" class="surface-section px-4 py-8 md:px-6 lg:px-8">
            <div class="overflow-x-auto">
                <table class="w-full white-space-nowrap" style="border-collapse: collapse; border-spacing: 0">
                    <thead>
                        <tr>
                            <td class="surface-100 p-3">
                                <div class="text-3xl text-900 mb-2">Pricing</div>
                                <span class="text-600 line-height-3">Fringilla est ullamcorper eget nulla facilisi etiam</span>
                            </td>
                            <td class="surface-100 p-3 text-center">
                                <div class="text-900 text-xl font-medium mb-3">Basic</div>
                                <div class="text-600 mb-3"><span class="text-3xl text-900">$10</span> /month</div>
                                <button pButton pRipple type="button" class="p-button-rounded" label="Free Trial"></button>
                            </td>
                            <td class="surface-100 p-3 text-center">
                                <div class="text-900 text-xl font-medium mb-3">Premium</div>
                                <div class="text-600 mb-3"><span class="text-3xl text-900">$20</span> /month</div>
                                <button pButton pRipple type="button" class="p-button-rounded" label="Buy Now"></button>
                            </td>
                            <td class="surface-100 p-3 text-center">
                                <div class="text-900 text-xl font-medium mb-3">Enterprise</div>
                                <div class="text-600 mb-3"><span class="text-3xl text-900">$30</span> /month</div>
                                <button pButton pRipple type="button" class="p-button-rounded p-button-outlined" label="Contact Us"></button>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="p-3 text-900 font-medium border-bottom-1 border-200">Arcu purus</td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                        </tr>
                        <tr>
                            <td class="p-3 text-900 font-medium border-bottom-1 border-200">Posuere felis</td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                        </tr>
                        <tr>
                            <td class="p-3 text-900 font-medium border-bottom-1 border-200">Curabitur mollis</td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                        </tr>
                        <tr>
                            <td class="p-3 text-900 font-medium border-bottom-1 border-200">Vitae odio</td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                        </tr>
                        <tr>
                            <td class="p-3 text-900 font-medium border-bottom-1 border-200">Orci, mi</td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-500 pi pi-times"></i></td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                        </tr>
                        <tr>
                            <td class="p-3 text-900 font-medium border-bottom-1 border-200">Tincidunt vulputate</td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-500 pi pi-times"></i></td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-500 pi pi-times"></i></td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                        </tr>
                        <tr>
                            <td class="p-3 text-900 font-medium border-bottom-1 border-200">Quis felis</td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-500 pi pi-times"></i></td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-500 pi pi-times"></i></td>
                            <td class="text-center p-medium border-bottom-1 border-200"><i class="text-green-500 pi pi-check"></i></td>
                        </tr>
                        <tr>
                            <td class="p-3 text-900 font-medium border-bottom-1 border-200">Dignissim vivamus</td>
                            <td class="text-center text-600 border-bottom-1 border-200">Up to <span class="text-900">5</span> files</td>
                            <td class="text-center text-600 border-bottom-1 border-200">Up to <span class="text-900">10</span> files</td>
                            <td class="text-center text-900 border-bottom-1 border-200">Unlimited</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
})
export class PricingWidget {}
