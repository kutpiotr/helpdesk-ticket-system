import { Routes } from '@angular/router';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel';
import { TicketDetailsComponent } from './pages/ticket-details/ticket-details';
import { TicketFormComponent } from './pages/ticket-form/ticket-form';
import { TicketListComponent } from './pages/ticket-list/ticket-list';

export const routes: Routes = [
 { path: '', component: TicketListComponent, pathMatch: 'full' },
 { path: 'tickets', component: TicketListComponent },
 { path: 'tickets/new', component: TicketFormComponent },
 { path: 'tickets/:id', component: TicketDetailsComponent },
 { path: 'admin', component: AdminPanelComponent }
];