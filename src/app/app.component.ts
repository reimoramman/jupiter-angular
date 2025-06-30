import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RibbonComponent } from './components/ribbon/ribbon.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RibbonComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'jupiter-err-ribbons';
  ribbons: { title: string; items: any[]; url: string }[] = [];

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
      });
  }
}
