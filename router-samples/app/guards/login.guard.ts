import {CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class LoginGuard implements CanActivate{
	canActivate(destination: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		console.log(destination.component.name);
		return this.checkIfLoggedIn();
	}

	private checkIfLoggedIn(): boolean {
		let loggedIn:boolean = Math.random() < 0.5;
		if(!loggedIn){
			console.log("LoginGuard: The user is not logged in and can't navigate product details");
		}
		return loggedIn;
	}
}