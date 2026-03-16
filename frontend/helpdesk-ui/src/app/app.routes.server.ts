import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
 { path: '', renderMode: RenderMode.Client },
 { path: 'tickets', renderMode: RenderMode.Client },
 { path: 'tickets/new', renderMode: RenderMode.Client },
 { path: 'tickets/:id', renderMode: RenderMode.Client },
 { path: 'admin', renderMode: RenderMode.Client },
 { path: '**', renderMode: RenderMode.Client }
];