import {Component, EventEmitter, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {

  selectedFile!: File;
  @Output() event = new EventEmitter();
  public image: any;

  constructor(private http: HttpClient) {
  }

  /**
   *  Validate uploader params
   * @param event
   */
  public onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile) {
      return this.upload();
    }
  }


  /**
   * Upload image to server and receive image object
   */
  upload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    // this.http.post('http://example.com/upload/image', fd)
    // .subscribe((res: any) => {
    //   this.image = res.data;
    //   this.event.emit(this.image);
    // }, (err: any) => {
    //   // Show error message or make something.
    // });
  }

}
