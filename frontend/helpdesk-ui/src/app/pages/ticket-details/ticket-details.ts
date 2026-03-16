import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TicketDetail } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
 selector: 'app-ticket-details',
 standalone: true,
 imports: [CommonModule],
 templateUrl: './ticket-details.html',
 styleUrl: './ticket-details.css'
})
export class TicketDetailsComponent implements OnInit {
 private route = inject(ActivatedRoute);
 private ticketService = inject(TicketService);

 ticket: TicketDetail | null = null;
 loading = true;
 error = '';

 ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));

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
}