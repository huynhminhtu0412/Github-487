import { Component } from '@angular/core';
import '../vendor/jitsi/external_api.js';
import {Observable} from 'rxjs/Rx';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'classroom';
  domain:string = "meet.jit.si";
  options: any;
  api: any;
	 ngAfterViewInit(): void {
     
		this.options = {
		  interfaceConfigOverwrite: { 
		  TOOLBAR_BUTTONS: [

        
        'microphone', 'camera', 'desktop', 'invite', 'fullscreen', 'fodeviceselection', 'hangup',

        
		'profile', 'contacts', 'info', 'recording', 'etherpad', 'sharedvideo', 'settings', 'raisehand', 'videoquality', 'filmstrip' ]},
		  roomName: "JitsiMeetAPIExample",
		  width: 700,
		  height: 700,
		  parentNode: document.querySelector('#meet')
		}

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
    }
}
