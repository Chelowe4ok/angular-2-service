import { Component } from '@angular/core'

@Component({
    selector: 'queues',
    templateUrl: './queue.component.html',
    styleUrls: ['queue.component.css']
})
export class QueueComponent {
    queues: number[] = [1, 2, 3, 4];
}