import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ribbon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.css']
})
export class RibbonComponent {
  private _title: string = '';
  private _url: string = '';
  private _items: any[] = [];

  @Input() set title(val: string) {
    this._title = val;
    this.logData();
  }
  @Input() set url(val: string) {
    this._url = val;
    this.logData();
  }
  @Input() set items(val: any[]) {
    this._items = val;
    this.logData();
  }

  @ViewChild('ribbonContainer') ribbonContainer!: ElementRef;

  get title(): string {
    return this._title;
  }

  get url(): string {
    return this._url;
  }

  get items(): any[] {
    return this._items;
  }

  logData() {
    if (this._title && this._url && this._items?.length) {
      console.log('✅ RibbonComponent loaded:', this._title, this._url);
    }
  }

  scrollLeft() {
    this.ribbonContainer?.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.ribbonContainer?.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  isWideCategory(): boolean {
    const wideCategories = ['etv70', 'r2-minilaiv', 'peagi-aeguvad'];
    return wideCategories.includes(this.url);
  }

  getAspectRatioClass(): string {
    return this.isWideCategory() ? 'aspect-16-9' : 'aspect-9-16';
  }

  getImageUrl(item: any): string {
    if (!item.verticalPhotos || item.verticalPhotos.length === 0) return '';
    const photo = item.verticalPhotos[0];
    const types = ['17', '34', '2'];
    for (const t of types) {
      if (photo.photoTypes && photo.photoTypes[t]) return photo.photoTypes[t].url;
    }
    return photo.photoUrlBase || '';
  }
}
