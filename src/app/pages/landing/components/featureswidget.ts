import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'features-widget',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div id="features" class="surface-section px-4 py-8 md:px-6 lg:px-8">
            <div class="font-bold text-900 text-3xl mb-3 text-center">Build The Way You Want</div>
            <div class="text-700 text-center mb-3">Risus feugiat in ante metus. Lacus suspendisse faucibus interdum posuere lorem.</div>
            <div class="flex flex-wrap">
                <div class="w-full lg:w-6 xl:w-3 p-5">
                    <img src="img/feature-illustration-1.svg" alt="Image" class="w-full" />
                    <div class="mt-3 mb-2 font-medium text-900 text-xl">Ornare Arcu Odio</div>
                    <span class="text-700 line-height-3">Quisque sagittis purus sit amet volutpat consequat mauris nunc. Scelerisque eleifend.</span>
                    <a tabindex="0" class="text-blue-500 font-medium flex align-items-center mt-2">
                        <span>Explore</span>
                        <i class="pi pi-arrow-right ml-3"></i>
                    </a>
                </div>
                <div class="w-full lg:w-6 xl:w-3 p-5">
                    <img src="img/feature-illustration-2.svg" alt="Image" class="w-full" />
                    <div class="mt-3 mb-2 font-medium text-900 text-xl">Sem Nulla Pharetra</div>
                    <span class="text-700 line-height-3">Quisque sagittis purus sit amet volutpat consequat mauris nunc. Scelerisque eleifend.</span>
                    <a tabindex="0" class="text-blue-500 font-medium flex align-items-center mt-2">
                        <span>Explore</span>
                        <i class="pi pi-arrow-right ml-3"></i>
                    </a>
                </div>
                <div class="w-full lg:w-6 xl:w-3 p-5">
                    <img src="img/feature-illustration-3.svg" alt="Image" class="w-full" />
                    <div class="mt-3 mb-2 font-medium text-900 text-xl">Facilisi Etiam Dignissim</div>
                    <span class="text-700 line-height-3">Quisque sagittis purus sit amet volutpat consequat mauris nunc. Scelerisque eleifend.</span>
                    <a tabindex="0" class="text-blue-500 font-medium flex align-items-center mt-2">
                        <span>Explore</span>
                        <i class="pi pi-arrow-right ml-3"></i>
                    </a>
                </div>
                <div class="w-full lg:w-6 xl:w-3 p-5">
                    <img src="img/feature-illustration-4.svg" alt="Image" class="w-full" />
                    <div class="mt-3 mb-2 font-medium text-900 text-xl">Risus Feugiat In Ante</div>
                    <span class="text-700 line-height-3">Quisque sagittis purus sit amet volutpat consequat mauris nunc. Scelerisque eleifend.</span>
                    <a tabindex="0" class="text-blue-500 font-medium flex align-items-center mt-2">
                        <span>Explore</span>
                        <i class="pi pi-arrow-right ml-3"></i>
                    </a>
                </div>
            </div>
        </div>
    `
})
export class FeaturesWidget {}
