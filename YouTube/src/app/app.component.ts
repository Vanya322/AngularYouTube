import { Component, ElementRef, ViewChild } from '@angular/core';
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
  channelsArray = [];
  searchStr = '';
  searchCategory = '';
  newCategory = '';
  SortElems = true;
  maxRes = 15;
  countVideos = '';
  resValueStr = 0;
  
  ngOnInit() {
    this.requestList();
  }

  async requestList() {
    
    if(this.countVideos !== '' ) {
      this.resValueStr += Number(this.countVideos);
      this.maxRes = +this.resValueStr;

      if(this.searchCategory !== this.newCategory) {
        this.channelsArray.splice(0, this.resValueStr);
        console.log(`res: ${this.maxRes} search: ${this.searchCategory}`);
        this.resValueStr = 0;
        this.resValueStr += Number(this.countVideos);
        this.maxRes = this.resValueStr;
      } 

    }
    else 
      return console.log('Не заполнены поля');     
    
    await this.YoutubeService.getChannel(this.searchCategory, this.countVideos)
      .subscribe(data => {
        console.log(data);
        this.channelsObj = data.items;  
        for(let channel of this.channelsObj) {
          this.channelsArray
            .push({
              channelId: channel.snippet.channelId,
              channelTitle: channel.snippet.channelTitle,
              videoId: channel.id.videoId,
              videoImg: channel.snippet.thumbnails.medium.url,
              videoName: channel.snippet.title,
              check: false
            });   
        }
        this.newCategory = this.searchCategory;
      });   
      
  }
} 