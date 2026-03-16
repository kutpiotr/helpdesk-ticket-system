import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TicketService } from '../../services/ticket.service';

@Component({
 selector: 'app-ticket-form',
 standalone: true,
 imports: [CommonModule, FormsModule],
 templateUrl: './ticket-form.html',
 styleUrl: './ticket-form.css'
})
export class TicketFormComponent {
 private ticketService = inject(TicketService);

 title = '';
 description = '';
 userId = 1;
 successMessage = '';
 errorMessage = '';

 onSubmit(): void {
  this.successMessage = '';
  this.errorMessage = '';

  this.ticketService.createTicket({
   title: this.title,
   description: this.description,
   user_id: this.userId
  }).subscribe({
   next: () => {
    this.successMessage = 'Zgłoszenie zostało utworzone.';
    this.title = '';
    this.description = '';
   },
   error: () => {
    this.errorMessage = 'Nie udało się utworzyć zgłoszenia.';
   }
  });
 }
}