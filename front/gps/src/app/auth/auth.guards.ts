import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthServiceService } from "./auth-service.service";

export const AuthGuard = () => {
    const auth = inject(AuthServiceService);
    const router = inject(Router);

    if(!auth.isAuthenticated()) {
        router.navigateByUrl('/login')
        return false
    }
    return true
}