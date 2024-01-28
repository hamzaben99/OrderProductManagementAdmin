import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  @Input() accept: string;
  @Output('filesSelected') filesSelectedEmitter = new EventEmitter<File[]>();
  files: File[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files);
  }

  prepareFilesList(files: any) {
    for (const item of files)
      this.files.push(item);

    if (this.files.length > 0) {
      this.filesSelectedEmitter.emit(this.files);
      this.files = [];
    }
  }
}
