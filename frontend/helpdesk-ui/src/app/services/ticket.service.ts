import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Comment } from '../models/comment.model';
import { Ticket, TicketCreate, TicketDetail, TicketStatusUpdate } from '../models/ticket.model';

@Injectable({
 providedIn: 'root'
})
export class TicketService {
 private http = inject(HttpClient);
 private apiUrl = 'http://127.0.0.1:8000/tickets';

 getTickets(): Observable<Ticket[]> {
  return this.http.get<Ticket[]>(this.apiUrl);
 }

 getTicketById(id: number): Observable<TicketDetail> {
  return this.http.get<TicketDetail>(`${this.apiUrl}/${id}`);
 }

 createTicket(ticket: TicketCreate): Observable<Ticket> {
  return this.http.post<Ticket>(`${this.apiUrl}/`, ticket);
 }

 updateTicketStatus(ticketId: number, adminId: number, data: TicketStatusUpdate): Observable<Ticket> {
  return this.http.patch<Ticket>(`${this.apiUrl}/${ticketId}/status?admin_id=${adminId}`, data);
 }

 getComments(ticketId: number): Observable<Comment[]> {
  return this.http.get<Comment[]>(`${this.apiUrl}/${ticketId}/comments`);
 }

 createComment(ticketId: number, content: string, authorId: number): Observable<Comment> {
  return this.http.post<Comment>(`${this.apiUrl}/${ticketId}/comments`, {
   content,
   author_id: authorId
  });
 }
}