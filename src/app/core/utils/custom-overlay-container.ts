import { Inject, Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';

@Injectable()
export class CustomOverlayContainer extends OverlayContainer {

  constructor(@Inject(DOCUMENT) document: Document, _platform: Platform) {
    super(document, _platform);
  }
  protected override _createContainer(): void {
    let container = document.createElement('div');
    container.classList.add('cdk-overlay-container');
    document.getElementById('app')?.appendChild(container);
    this._containerElement = container;

  }
}
