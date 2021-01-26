import { Component, ElementRef, QueryList, ViewChild } from '@angular/core';
import { YoutubeService } from './services/youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  exportAs: 'check'
})

export class AppComponent {

  @ViewChild('channelName') channelName: ElementRef | undefined;

  constructor( private YoutubeService: YoutubeService) { }

  title = 'testApp';
  channelsObj:any;
  channelsArray = [{}];
  searchStr = '';
  SortElems = true;
  maxRes = '15';
  countVideos: string = '';
  resValueStr = Number(this.maxRes) + Number(this.countVideos);
  
  ngOnInit() {
    this.requestList();
  }

  requestList() {
    this.resValueStr += Number(this.countVideos);
    if(this.countVideos !== '') this.maxRes = this.countVideos;
    this.YoutubeService.getChannel('programming', this.maxRes)
      .subscribe(data => {
        console.log(data);
        this.channelsObj = data.items;
      
        for(let channel of this.channelsObj) {
          this.channelsArray.push({
            channelId: channel.snippet.channelId,
            channelTitle: channel.snippet.channelTitle,
            videoId: channel.id.videoId,
            videoImg: channel.snippet.thumbnails.medium.url,
            check: false
          });
        }
        this.channelsArray.splice(0, 1);
        this.countVideos = ''
      });      
  }

} 