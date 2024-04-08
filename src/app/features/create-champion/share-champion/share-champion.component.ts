import { ChampionSelect } from 'src/app/shared/models/champion-select';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, inject } from '@angular/core';
import html2canvas from 'html2canvas';
import { Champion } from 'src/app/shared/models/champion.model';

@Component({
  selector: 'app-share-champion',
  templateUrl: './share-champion.component.html',
  styleUrls: ['./share-champion.component.scss']
})
export class ShareChampionComponent {
  @Input() champion: Champion;
  @Input() championsSelectResult: ChampionSelect;

  private el = inject(ElementRef);

  get hasChampion(): boolean {
    return this.champion?.name !== undefined;
  }
  get disableButton(): boolean {
    return (this.championsSelectResult.spells.filter(x => x.selected == true).length === 5)
      && this.hasChampion;
  }

  share() {
    console.log(this.champion)
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
