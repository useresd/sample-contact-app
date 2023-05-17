import { AuthInterceptor } from "./auth-interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpErrorHandlingInterceptor } from "./error-handling-interceptor";

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
]