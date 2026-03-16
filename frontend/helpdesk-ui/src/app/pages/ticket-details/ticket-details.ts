import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { TicketDetail } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
 selector: 'app-ticket-details',
 standalone: true,
 imports: [CommonModule, RouterModule],
 templateUrl: './ticket-details.html',
 styleUrl: './ticket-details.css'
})
export class TicketDetailsComponent implements OnInit {
 private route = inject(ActivatedRoute);
 private router = inject(Router);
 private ticketService = inject(TicketService);

 ticket: TicketDetail | null = null;
 loading = true;
 error = '';
 deleting = false;
 deleteMessage = '';

 ngOnInit(): void {
  this.loadTicket();
 }

 loadTicket(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.loading = true;
  this.error = '';

  this.ticketService.getTicketById(id).subscribe({
   next: (data) => {
    this.ticket = data;
    this.loading = false;
   },
   error: () => {
    this.error = 'Nie udało się pobrać szczegółów zgłoszenia.';
    this.loading = false;
   }
  });
 }

 deleteTicket(): void {
  if (!this.ticket) {
   return;
  }

  const confirmed = window.confirm('Czy na pewno chcesz usunąć to zgłoszenie?');
  if (!confirmed) {
   return;
  }

  this.deleting = true;
  this.error = '';

  this.ticketService.deleteTicket(this.ticket.id).subscribe({
   next: () => {
    this.deleteMessage = 'Zgłoszenie zostało usunięte.';
    this.deleting = false;

    setTimeout(() => {
     this.router.navigate(['/tickets']);
    }, 800);
   },
   error: () => {
    this.error = 'Nie udało się usunąć zgłoszenia.';
    this.deleting = false;
   }
  });
 }
}