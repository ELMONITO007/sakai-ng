import { Injectable } from "@angular/core";

export interface miIp{
    ip: string;
}
@Injectable({ providedIn: 'root'})
class MyIp implements miIp {
    ip: string;

    constructor(ip: string) {
        this.ip = "http://localhost:4200/";
    }
}
