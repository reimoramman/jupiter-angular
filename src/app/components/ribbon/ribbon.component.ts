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
  @Input() items: any[] = [];
  @Input() url!: string;

  @ViewChild('ribbonContainer') ribbonContainer!: ElementRef;

  scrollLeft(): void {
    this.ribbonContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.ribbonContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  getImageUrl(item: any): string {
    const photo = item.horizontalPhotos?.[0] || item.verticalPhotos?.[0];
    if (!photo) return '';

    const types = ['17', '34', '2'];
    for (const t of types) {
      if (photo.photoTypes?.[t]?.url) {
        return photo.photoTypes[t].url;
      }
    }

    return photo.photoUrlBase || '';
  }

  getAspectRatioClass(item: any): string {
    const isVertical = !item.horizontalPhotos?.length && item.verticalPhotos?.length;
    return isVertical ? 'aspect-9-16' : 'aspect-16-9';
  }
}
