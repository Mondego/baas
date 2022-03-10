import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class JgiganticService {
  constructor(private http: HttpClient) {
  }

  public getData = () => {
    return this.http.get("assets/jgigantic-with-links-2.json");
  }
}
