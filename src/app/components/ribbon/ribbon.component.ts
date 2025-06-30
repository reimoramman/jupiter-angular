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
  @Input() title!: string;
  @Input() url!: string;
  @Input() items: any[] = [];

  @ViewChild('ribbonContainer') ribbonContainer!: ElementRef;

  scrollLeft() {
    this.ribbonContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.ribbonContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
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

  isWideCategory(): boolean {
    const wideCategories = ['etv70', 'r2-minilaiv', 'peagi-aeguvad'];
    return wideCategories.includes(this.url);
  }

  getAspectRatioClass(): string {
    return this.isWideCategory() ? 'aspect-16-9' : 'aspect-9-16';
  }
}