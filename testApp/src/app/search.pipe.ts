import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform{
    transform(channels:any, search:string) {
        if (search === '') 
            return channels; 
        else {
            return channels.filter((channel) => {
                return channel.channelTitle.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        }
        
    }
}