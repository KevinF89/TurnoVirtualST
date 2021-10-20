import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AlertaService {
    private subject = new Subject<any>();
    private keepAfterRouteChange = false;
    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                }
                else {
                    // clear alert message
                    this.clear();
                }
            }
        });
    }
    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }
    success(message: string,isTimeOut:boolean, secondsTimeOut:number= 0, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'success', text: message });
        this.setTimeOutAlert(isTimeOut,secondsTimeOut);
    }
    error(message: string,isTimeOut:boolean, secondsTimeOut:number= 0, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'error', text: message });
        this.setTimeOutAlert(isTimeOut,secondsTimeOut);
    }
    info(message: string,isTimeOut:boolean, secondsTimeOut:number= 0, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'info', text: message });
        this.setTimeOutAlert(isTimeOut,secondsTimeOut);
    }
    warning(message: string,isTimeOut:boolean, secondsTimeOut:number= 0, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'warning', text: message });
        this.setTimeOutAlert(isTimeOut,secondsTimeOut);
    }
    primary(message: string,isTimeOut:boolean, secondsTimeOut:number= 0, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'primary', text: message });
        this.setTimeOutAlert(isTimeOut,secondsTimeOut);
    }
    secondary(message: string,isTimeOut:boolean, secondsTimeOut:number= 0, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'secondary', text: message });
        this.setTimeOutAlert(isTimeOut,secondsTimeOut);
    }
    clear() {
        // clear by calling subject.next() without parameters
        this.subject.next();
    }

    setTimeOutAlert(isTimeOut:boolean, secondsTimeOut?:number){
        if(isTimeOut){
            if(secondsTimeOut > 0){
                setTimeout(()=>{ this.clear() },secondsTimeOut) ;
            }else{ //1 segundo  por defecto para mantener la notificación visible
                setTimeout(()=>{ this.clear() },1000) ;
            }
        }
    }



}
