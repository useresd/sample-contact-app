import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { LoadingService } from "../loading.service";
import { Router } from "@angular/router";

@Injectable()
export class HttpErrorHandlingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse): Observable<HttpEvent<any>> => {

                this.loadingService.setLoading(false);

                if (error.status === 0) {
                // client error
                window.alert(
                    "couldn't access server. Please check your network connection and try again."
                );
                } else if (error.status === 401) {

                // if the status code is unauthorized then redirect to login page
                window.alert(error.error);
                    this.router.navigate(['/login']);
                } else {
                    window.alert(error.error);
                }

                return throwError(() => new Error("Something bad happened; please try again later."))
            })
        )
    }
}