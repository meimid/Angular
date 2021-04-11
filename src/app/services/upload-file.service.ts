import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
import {AuthHttp } from 'app/services/index';
import {  Response,RequestOptions } from '@angular/http';
import {Config}   from 'app/services/Config';
@Injectable()
export class UploadFileService {

  private baseUrl = 'http://localhost:8080';

  constructor(private  _authHttp: AuthHttp,private http:HttpClient ) { }
//
//Observable<Response>
  upload(file: File): Observable<HttpEvent<any>>  {
    const formData: FormData = new FormData();
          let headers1 = new HttpHeaders().set("Authorization", sessionStorage.getItem('currentUser'));           
			//headers.append('Content-Type', 'application/json');
        //   headers1.set("Authorization", sessionStorage.getItem('currentUser'))			
		//	let options = new RequestOptions({ headers: headers1 });
    formData.append('file', file);
	//return this._authHttp.post(`/upload/upload`, formData, { reportProgress: true    });
  // /
  const req = new HttpRequest('POST',Config.url_path+ `/upload/upload`, formData,{ reportProgress: true,'headers':headers1    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this._authHttp.get(`${this.baseUrl}/files`);
  }
}