import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../shared/user';
import { Router, RouterModule, Routes, Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'user-menu',
    templateUrl: 'information.component.html',
    styleUrls: ['user.component.css']
})
export class UserComponent implements OnInit {

    user: User;
    error: string;
    constructor(private route: ActivatedRoute) {
        
    }

    ngOnInit() {
        console.log('init user');
        this.user = this.route.snapshot.data['dataUser'];
        
    }
}

@Injectable()
export class UserResolve implements Resolve<any> {

    constructor(private userService: UserService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Promise<any> {
        console.log("resolver");
        return this.userService.getUserInfoPromise();
    }
}
