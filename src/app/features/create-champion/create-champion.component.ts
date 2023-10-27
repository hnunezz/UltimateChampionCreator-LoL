
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { getSpellsList } from 'src/app/shared/enums/spells';
import { ChampionSelect } from 'src/app/shared/models/champion-select';
import { Champion } from 'src/app/shared/models/champion.model';
import { SpellList, SpellSelect } from 'src/app/shared/models/spell-select';
import { RequestService } from '../../shared/services/request.service';
import { ChampionListComponent } from './champion-list/champion-list.component';
import { SpellListService } from './spell-list/services/spell-list.service';
@Component({
  selector: 'app-create-champion',
  templateUrl: './create-champion.component.html',
  styleUrls: ['./create-champion.component.scss'],
  providers: [DialogService]
})
export class CreateChampionComponent implements OnInit {

  public championsSelectResult: ChampionSelect;
  public listGeneralSpells: SpellList = new SpellList()
  public spellsList: Array<SpellList> = new Array<SpellList>()
  public championSelected: Champion;

  public selectedSpell: number;
  public spellsSelectionsItems: Array<any> = [];
  public loading: boolean;

  public get hasChampionSelected(): boolean {
    return this.championSelected?.name !== undefined;
  }

  constructor(public dialogService: DialogService,
    private requestService: RequestService,
    private spellListService: SpellListService,
  ) {
    this.championsSelectResult = new ChampionSelect();
    this.listGeneralSpells = new SpellList()
    this.spellsList = new Array<SpellList>()

    this.selectedSpell = 0;
    this.loading = true;
  }

  ngOnInit() {
    this.loading = true;

    this.requestService.getChampions();

    this.loading = false;
    this.setSpellsSelections();
  }

  private setSpellsSelections(): void {
    const spellsList = getSpellsList()
    this.spellsSelectionsItems = spellsList
      .map(element => { return { active: false, label: element[1], key: element[0], image: '' } })

    // this.spellsSelectionsItems[0].active = true;
  }

  public selectSpell(spellActive: number): void {
    this.selectedSpell = spellActive;

    this.spellListService.spell = spellActive;

    this.listGeneralSpells = new SpellList();

    const anotherSpells = this.spellsSelectionsItems.filter((x: any) => x.key != spellActive);
    anotherSpells.forEach((x: any) => x.active = false)
    this.spellsSelectionsItems[spellActive].active = true;

    this.listGeneralSpells = this.spellsList[spellActive];
  }

  public setHability(event: SpellSelect): void {
    this.championsSelectResult.spells[this.selectedSpell] = event;
  }

  public showChampionList() {
    const ref = this.dialogService.open(ChampionListComponent, {
      width: '100%',
      height: '100%',
      styleClass: 'initial-heigh-modal'
    });

    ref.onClose.subscribe((champion: Champion) => {
      if (champion) {
        this.championSelected = champion;
        console.log(champion)
      }
    })
  }
}
