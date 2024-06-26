import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.css']
})
export class StarsRatingComponent implements OnInit {
  @Input() rating: number;
  starWidth: number;

  ngOnInit() {
    if (!this.rating)
      this.rating = 3;
    this.starWidth = (this.rating / 5) * 100;
  }
}
