import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }

  apiKey='AIzaSyC8dmrjgXEpnmzykdApw6l-MNcPWqKOlZY';
  /*
    'AIzaSyC8dmrjgXEpnmzykdApw6l-MNcPWqKOlZY'
    'AIzaSyD_ziheXt3-W7uboys2EgSormKyrG2rkZU'
    'AIzaSyCdZy171Xti26fjBLqOaaXPQ78v8nMR9TQ'
  */

  getChannel(category:string, maxRes:number):Observable<any> {
    const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ category +"&key="+ this.apiKey+"&maxResults="+ maxRes;
    return this.http.get(url);
  }
}