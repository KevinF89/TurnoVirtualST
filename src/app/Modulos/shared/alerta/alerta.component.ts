import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {AlertaService} from 'src/app/Servicios/alerta.service';

@Component({ selector: 'alerta', templateUrl: 'alerta.component.html' })
export class AlertaComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertaService) { }

    ngOnInit() {
        this.subscription = this.alertService.getAlert()
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        break;
                    case 'warning':
                        message.cssClass='alert alert-warning';
                        break;
                    case 'primary':
                        message.class ='alert alert-primary';
                        break;
                    case 'secondary':
                        message.class ='alert alert-secondary';
                        break;
                    case 'info':
                        message.class ='alert alert-info';
                        break;
                }

                this.message = message;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}