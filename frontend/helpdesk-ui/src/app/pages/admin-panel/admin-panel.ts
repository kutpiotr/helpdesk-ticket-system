import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Comment } from '../../models/comment.model';
import { Ticket } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
 selector: 'app-admin-panel',
 standalone: true,
 imports: [CommonModule, FormsModule],
 templateUrl: './admin-panel.html',
 styleUrl: './admin-panel.css'
})
export class AdminPanelComponent implements OnInit {
 private ticketService = inject(TicketService);

 tickets: Ticket[] = [];
 selectedTicketId: number | null = null;
 comments: Comment[] = [];

 adminId = 3;
 newStatus = 'in_progress';
 newComment = '';

 loading = true;
 commentsLoading = false;
 message = '';
 error = '';

 ngOnInit(): void {
  this.loadTickets();
 }

 loadTickets(): void {
  this.loading = true;
  this.ticketService.getTickets().subscribe({
   next: (data) => {
    this.tickets = data;
    this.loading = false;
   },
   error: () => {
    this.error = 'Nie udało się pobrać zgłoszeń.';
    this.loading = false;
   }
  });
 }

 selectTicket(ticketId: number): void {
  this.selectedTicketId = ticketId;
  this.loadComments(ticketId);
 }

 loadComments(ticketId: number): void {
  this.commentsLoading = true;
  this.ticketService.getComments(ticketId).subscribe({
   next: (data) => {
    this.comments = data;
    this.commentsLoading = false;
   },
   error: () => {
    this.error = 'Nie udało się pobrać komentarzy.';
    this.commentsLoading = false;
   }
  });
 }

 updateStatus(ticketId: number): void {
  this.message = '';
  this.error = '';

  this.ticketService.updateTicketStatus(ticketId, this.adminId, { status: this.newStatus }).subscribe({
   next: () => {
    this.message = 'Status został zaktualizowany.';
    this.loadTickets();
    if (this.selectedTicketId === ticketId) {
     this.loadComments(ticketId);
    }
   },
   error: () => {
    this.error = 'Nie udało się zmienić statusu.';
   }
  });
 }

 addComment(ticketId: number): void {
  if (!this.newComment.trim()) {
   return;
  }

  this.message = '';
  this.error = '';

  this.ticketService.createComment(ticketId, this.newComment, this.adminId).subscribe({
   next: () => {
    this.message = 'Komentarz został dodany.';
    this.newComment = '';
    this.loadComments(ticketId);
   },
   error: () => {
    this.error = 'Nie udało się dodać komentarza.';
   }
  });
 }
}