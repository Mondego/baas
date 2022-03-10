import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BuildRequest} from "../baas/build.request.model";


@Injectable({
  providedIn: 'root'
})
export class JbfBuildService {
  ////http://127.0.0.1:5000/project?url=https://github.com/vishalsurya/APPROXIMATE-TEXT-MATCH&commit=2a768682e92b9cf6f1566e74dd854ccb0407ad71
  public endpointUrl = environment.backendBaseUrl;

  constructor(private httpClient: HttpClient) {

  }

  executeJBFBuild(buildRequest: BuildRequest): Observable<any> {
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(buildRequest);
    console.log(body)
    return this.httpClient.post(this.endpointUrl + 'project', body, {'headers': headers})
  }

  // executeJBFBuild(url:string, commit_sha: string): Observable<any> {
  //   return this.httpClient.get<any>(this.endpointUrl + "url=" + url + "&" + "commit_sha=" + commit_sha);
  // }
}
