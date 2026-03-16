import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
 private router = inject(Router);

 title = '';
 description = '';
 userId = 1;
 successMessage = '';
 errorMessage = '';
 submitting = false;

 onSubmit(): void {
  this.successMessage = '';
  this.errorMessage = '';
  this.submitting = true;

  this.ticketService.createTicket({
   title: this.title,
   description: this.description,
   user_id: this.userId
  }).subscribe({
   next: () => {
    this.successMessage = 'Zgłoszenie zostało utworzone.';
    this.title = '';
    this.description = '';
    this.submitting = false;

    setTimeout(() => {
     this.router.navigate(['/tickets']);
    }, 800);
   },
   error: () => {
    this.errorMessage = 'Nie udało się utworzyć zgłoszenia.';
    this.submitting = false;
   }
  });
 }
}