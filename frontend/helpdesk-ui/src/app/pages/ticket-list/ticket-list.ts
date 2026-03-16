import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ticket } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
 selector: 'app-ticket-list',
 standalone: true,
 imports: [CommonModule, RouterModule],
 templateUrl: './ticket-list.html',
 styleUrl: './ticket-list.css'
})
export class TicketListComponent implements OnInit {
 private ticketService = inject(TicketService);

 tickets: Ticket[] = [];
 loading = true;
 error = '';

 ngOnInit(): void {
  this.loadTickets();
 }

 loadTickets(): void {
  this.loading = true;
  this.error = '';

  this.ticketService.getTickets().subscribe({
   next: (data) => {
    this.tickets = data;
    this.loading = false;
   },
   error: (err) => {
    console.error(err);
    this.error = 'Nie udało się pobrać zgłoszeń.';
    this.loading = false;
   }
  });
 }
}