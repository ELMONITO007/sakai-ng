import { Component } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

import { HeroWidget } from '../components/herowidget';
import { FeaturesWidget } from '../components/featureswidget';
import { HighlightsWidget } from '../components/highlightswidget';
import { PricingWidget } from '../components/pricingwidget';
import { FooterWidget } from '../components/footerwidget';
import { TopbarWidget } from '../components/topbarwidget.component';


@Component({
  selector: 'app-landing-page',
  imports: [TopbarWidget, HeroWidget, FeaturesWidget, HighlightsWidget, PricingWidget, FooterWidget, RouterModule, RippleModule, StyleClassModule, ButtonModule, DividerModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  providers: [],
})
export class LandingPageComponent {
   constructor(public router: Router) {}

}
