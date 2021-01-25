import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class IntroGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let introSeen = await this.storage.get("seen-intro");

    if (!introSeen) {
      this.router.navigateByUrl("/intro");
    }

    return introSeen;
  }
}
