import { Component, Input } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-ribbon',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.css']
})
export class RibbonComponent {
  @Input() title!: string;
  @Input() url!: string;
  @Input() items: any[] = [];

  get ribbonClass(): string {
    if (!this.title) return 'ribbon-default';
    return 'ribbon-' + this.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '')
      .trim();
  }

  getAspectRatioClass(): string {
    const wide = ['etv70', 'r2-minilaiv', 'peagi-aeguvad'];
    return wide.includes(this.url) ? 'aspect-16-9' : 'aspect-9-16';
  }

  getImageUrl(item: any): string {

  if (item.verticalPhotos?.medium?.url) {
    return item.verticalPhotos.medium.url;
  }


  const photo = item.verticalPhotos?.[0];
  if (photo) {
    const types = ['17', '34', '2'];
    for (const type of types) {
      if (photo.photoTypes?.[type]?.url) {
        return photo.photoTypes[type].url;
      }
    }
   
    return photo.photoUrlBase || '';
  }


  return '';
}


}
