import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Ticket, TicketCreate, TicketDetail } from '../models/ticket.model';

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
}