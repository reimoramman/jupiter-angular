import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RibbonComponent } from './components/ribbon/ribbon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RibbonComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ribbons: { title: string; url: string; items: any[] }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  this.http.get<any>('https://services.err.ee/api/v2/category/getByUrl?url=video&domain=jupiter.err.ee')
    .subscribe(response => {
      const data = response.data?.category?.frontPage ?? [];
      this.ribbons = data
        .filter((r: any) => r.highTimeline)
        .map((r: any) => ({
          title: r.title,
          url: r.url,
          items: r.data
        }));
      console.log('📦 Loaded ribbons:', this.ribbons); // KAs saan andmed 
    });
  }
}
