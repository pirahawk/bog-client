import { Injectable } from '@angular/core';

@Injectable()
export class HeaderManagerService {
  public tryUpdateDocumentHeader(title: string, description: string, author: string): void {
    this.tryUpdateTitle(title);
    this.tryUpdateMetaTag('Description', description);
    this.tryUpdateMetaTag('Author', author);
  }

  private tryUpdateTitle(title: string): void {
    if (!title) {
      return;
    }

    this.tryUpdateMetaTag('title', title);

    const backupTitle: HTMLTitleElement = document.createElement('title') as HTMLTitleElement;
    const headElement: HTMLTitleElement = document.head.querySelector('title') ?? backupTitle;
    headElement.text = title;

    if (document.head.querySelector('title')){
      return;
    }

    document.head.appendChild(headElement);
  }

  private tryUpdateMetaTag(metaTagName: string, metaContent: string): void{
    if (!metaTagName || !metaContent){
      return;
    }

    const metaSelector = `meta[name=${metaTagName}]`;
    const backupMeta = document.createElement('meta') as HTMLMetaElement;
    backupMeta.name = metaTagName;
    const metaElement: HTMLMetaElement = document.head.querySelector(metaSelector) ?? backupMeta;
    metaElement.content = metaContent;

    if (document.head.querySelector(metaSelector)){
      return;
    }

    document.head.appendChild(metaElement);
  }
}
