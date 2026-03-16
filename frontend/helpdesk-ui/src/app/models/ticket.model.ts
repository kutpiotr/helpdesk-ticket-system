import { Comment } from './comment.model';

export interface Ticket {
 id: number;
 title: string;
 description: string;
 status: string;
 created_at: string;
 updated_at: string;
 user_id: number;
}

export interface TicketCreate {
 title: string;
 description: string;
 user_id: number;
}

export interface TicketDetail extends Ticket {
 comments: Comment[];
}

export interface TicketStatusUpdate {
 status: string;
}