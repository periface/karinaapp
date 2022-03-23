import { Component, Input } from '@angular/core';
import { BreadCrumb } from './breadcrumbs.model';

@Component({
  templateUrl: './breadcrumbs.components.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  selector: 'app-breadcrumbs',
})
export class BreadCrumbsComponent {
  /**
   *
   */
  @Input('breadcrumbs') breadcrumbs: BreadCrumb[] = [];
  constructor() {}
}
