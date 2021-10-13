import { LoginResponseDTO } from './../models/login-response-dto';
import { LoginRequestDTO } from './../models/login-request-dto';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { RegisterResponseDTO } from '../models/register-response-dto';
import { RegisterRequestDTO } from '../models/register-request-dto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentLoginResponseSource = new ReplaySubject<LoginResponseDTO | null>(1);
  currentLoginResponse$ = this.currentLoginResponseSource.asObservable();
  public token: string = "";
  private readonly storageLoginResponseKey = "user";
  public readonly loginUrl = `${this.baseUrl}/Auth/Login`;


  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    var json = sessionStorage.getItem(this.storageLoginResponseKey);
    if (json !== null && json !== undefined && json.trim() !== "") {
      var item = JSON.parse(json) as LoginResponseDTO;
      this.token = item.token;
      this.currentLoginResponseSource.next(item);
    } else {
      this.token = "";
      this.currentLoginResponseSource.next(null);
    }
  }

  login(request: LoginRequestDTO): Observable<LoginResponseDTO> {
    this.removeUserData();
    return this.http.post<LoginResponseDTO>(this.loginUrl, request)
      .pipe(map(response => {
        this.setCurrentLoginResponse(response);
        return response;
      }));
  }

  private setCurrentLoginResponse(data: LoginResponseDTO | null) {
    if (data === null || data === undefined) {
      this.token = "";
      this.currentLoginResponseSource.next(null);
      sessionStorage.removeItem(this.storageLoginResponseKey)
    } else {
      this.token = data.token;
      this.currentLoginResponseSource.next(data);
      sessionStorage.setItem(this.storageLoginResponseKey, JSON.stringify(data));
    }
  }

  removeUserData() {
    this.setCurrentLoginResponse(null);
  }

  register(request: RegisterRequestDTO): Observable<RegisterResponseDTO> {
    return this.http.post<RegisterResponseDTO>(`${this.baseUrl}/Auth/register`, request)
      .pipe(map(response => {
        this.setCurrentLoginResponse({
          userName: response.userName,
          id: response.id,
          fullName: response.fullName,
          token: response.token
        });
        return response;
      }));
  }
}
