import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';

export default function handleError(
  loadingService: LoadingService,
  router: Router
) {
  return (error: HttpErrorResponse) => {
    loadingService.setLoading(false);

    if (error.status === 0) {
      // client error
      window.alert(
        "couldn't access server. Please check your network connection and try again."
      );
    } else if (error.status === 401) {
      // if the status code is unauthorized then redirect to login page
      window.alert(error.error);
      router.navigate(['/login']);
    } else {
      window.alert(error.error);
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  };
}
