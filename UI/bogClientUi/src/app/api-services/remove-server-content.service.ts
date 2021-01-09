import { Injectable } from '@angular/core';

@Injectable()
export class RemoveServerContentService {

  readonly serverContentId: string = 'serverContent';

  constructor() { }

  public hideServerContent(): void{
    const serveContentElem: HTMLElement = document.getElementById(this.serverContentId);
    serveContentElem?.remove();
  }
}
