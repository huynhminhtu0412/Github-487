import { Component, OnInit } from '@angular/core';
import '../vendor/jitsi/external_api.js';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2/firestore';
import {Observable} from 'rxjs/Rx';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.css']
})
export class ClassRoomComponent implements OnInit {
  pdfSrc: String = '/assets/pdf-teaching-slides/pdf-test.pdf';

  error: any;
  page = 1;
  rotation = 0;
  zoom = 1.0;
  originalSize = false;
  pdf: any;
  renderText = false;
  progressData: PDFProgressData;
  isLoaded = false;
  stickToPage = false;
  showAll = false;
  autoresize = true;
  title = 'classroom';
  domain:string = "meet.jit.si";
  options: any;
  api: any;

  messagesCollection: AngularFirestoreCollection<any[]>;
  messages: Observable<any[]>;

  constructor(public afs: AngularFirestore) { }

  ngOnInit() {
    this.getChatData();
  }
  
  getChatData() {
    this.messagesCollection = this.afs.collection<any>('chat_messages');
      this.messages = this.messagesCollection.valuechanges();
  }

  newMessage(message) {
    this.messagesCollection.add(message);
  }

  incrementPage(amount: number) {
    this.page += amount;
  }

  incrementZoom(amount: number) {
    this.zoom += amount;
  }

  /**
   * Render PDF preview on selecting file
   */
  onFileSelected() {
    const $img: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }
  }

  /**
   * Get pdf information after it's loaded
   * @param pdf
   */
  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    this.isLoaded = true;
  }

  /**
   * Handle error callback
   *
   * @param error
   */
  onError(error: any) {
    this.error = error; // set error
  }

  /**
   * Pdf loading progress callback
   * @param {PDFProgressData} progressData
   */
  onProgress(progressData: PDFProgressData) {
    this.progressData = progressData;
    this.isLoaded = false;
    this.error = null; // clear error
  }

  getInt(value: number): number {
    return Math.round(value);
  }
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
