import { ChampionSelect } from 'src/app/shared/models/champion-select';
import { ChampionList } from './../../../shared/models/spell-select';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-share-champion',
  templateUrl: './share-champion.component.html',
  styleUrls: ['./share-champion.component.scss']
})
export class ShareChampionComponent {
  @Input() public champion: ChampionList;
  @Input() public championsSelectResult: ChampionSelect;

  public get hasChampion(): boolean {
    return this.champion.name !== undefined;
  }
  public get disableButton(): boolean {
    return (this.championsSelectResult.spells.filter(x => x.selected == true).length === 5)
      && this.hasChampion;
  }

  constructor(private el: ElementRef) { }

  public share(): void {
    html2canvas(this.el.nativeElement.querySelector("#capture")).then(async canvas => {
      const link = canvas.toDataURL("image/png");

      this.el.nativeElement.querySelector("#display-for-canvas").appendChild(canvas)

      const container = this.el.nativeElement.querySelector("#display-for-generate-print");
      container.innerHTML = '<img src="' + link + '" />'

      this.download(link)
    }).finally(() => console.log('completed download :D'))
  }

  private async download(link: string) {
    const a = document.createElement("a");
    a.href = link;
    a.download = `UCC_${this.champion.name.toLowerCase()}.png`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
