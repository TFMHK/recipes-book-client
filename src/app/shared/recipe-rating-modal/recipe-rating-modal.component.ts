import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-rating-modal',
  templateUrl: './recipe-rating-modal.component.html',
  styleUrls: ['./recipe-rating-modal.component.css']
})
export class RecipeRatingModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() ratingAdded = new EventEmitter<number>();
  @Output() commentAdded = new EventEmitter<string>();

  rating: number = 0;
  comment: string = '';

  onClose() {
    if (this.rating !== 0) {
      this.ratingAdded.emit(this.rating);
    }
    if (this.comment.trim() !== '') {
      this.commentAdded.emit(this.comment);
    }
    this.close.emit();
  }
}