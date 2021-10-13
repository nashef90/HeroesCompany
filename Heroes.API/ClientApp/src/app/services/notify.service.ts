import { Injectable } from '@angular/core';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private toastr: ToastrService) { }

  public exception(err: any): void {
    const errorMsg = this.getErrorMessage(err);
    this.error(errorMsg);
  }

  private getErrorMessage(err: any): string {
    if (err) {
      if (typeof err === "string") {
        return err;
      }

      if (typeof err.error === "string") {
        return err.error;
      }

      if (err.error && typeof err.error.message === "string") {
        return err.error.message;
      }

      if (err.response && typeof err.response.data === "string") {
        return err.response.data;
      }

      if (err.response && Array.isArray(err.response.data)) {
        return err.response.data[0];
      }

      if (typeof err.message === "string") {
        return err.message;
      }
    }
    return "Some error occurred, please try again";
  }

  /** show toast */
  show(message?: string, title?: string, override?: Partial<IndividualConfig>, type?: string): ActiveToast<any> {
    return this.toastr.show(message, title, override, type);
  }

  /** show successful toast */
  success(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.toastr.success(message, title, override);
  }

  /** show error toast */
  error(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.toastr.error(message, title, override);
  }

  /** show info toast */
  info(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.toastr.info(message, title, override);
  }

  /** show warning toast */
  warning(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.toastr.warning(message, title, override);
  }
}
