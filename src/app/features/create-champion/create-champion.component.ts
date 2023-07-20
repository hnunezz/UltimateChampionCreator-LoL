import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { getSpellsList } from 'src/app/shared/enums/spells';
import { ChampionSelect } from 'src/app/shared/models/champion-select';
import { Champions } from 'src/app/shared/models/champions';
import { ResponseModel } from 'src/app/shared/models/response-model.models';
import { ChampionList, SpellList, SpellSelect } from 'src/app/shared/models/spell-select';
import { CacheService } from 'src/app/shared/services/cache-service.service';
import { ChampionsService } from './../../shared/services/champions.service';
import { ChampionListComponent } from './champion-list/champion-list.component';
import { FilterService } from 'src/app/shared/services/filter-service.service';
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

  public selectedSpell: number;

  public spellsSelectionsItems: Array<any> = [];
  public displayMaximizable: boolean;

  public get hasSpellsSelect(): boolean {
    const result = this.spellsSelectionsItems.filter(x => x.active);
    return result.length != 0;
  }

  constructor(
    private championsService: ChampionsService,
    private cacheService: CacheService,
    public dialogService: DialogService,
  ) {
    this.championsSelectResult = new ChampionSelect();
    this.listGeneralSpells = new SpellList()
    this.spellsList = new Array<SpellList>()

    this.selectedSpell = 0;
  }

  async ngOnInit(): Promise<void> {
    this.setSpellsSelections();
    this.getSpells();
  }

  private getSpells(): void {
    const spells = Object.values(JSON.parse(this.cacheService.get('champions') as string)) as Champions[];
    this.spellsList = this.championsService.getChampionsSpells(spells);
  }

  private setSpellsSelections(): void {
    const spellsList = getSpellsList()
    this.spellsSelectionsItems = spellsList
      .map(element => { return { active: false, label: element[1], key: element[0] } })
  }

  public selectSpell(spellActive: number): void {
    this.selectedSpell = spellActive;
    this.listGeneralSpells = new SpellList();

    const anotherSpells = this.spellsSelectionsItems.filter((x: any) => x.key != spellActive);
    anotherSpells.forEach((x: any) => x.active = false)
    this.spellsSelectionsItems[spellActive].active = true;

    this.listGeneralSpells = this.spellsList[spellActive];
  }

  public filterSpell(event: string): void {
    this.listGeneralSpells = new SpellList();

    if (event == '') {
      this.listGeneralSpells.spells = this.spellsList[this.selectedSpell].spells;
    } else {
      this.listGeneralSpells.spells = [
        ...this.spellsList[this.selectedSpell].spells.filter(x => { return x.champion.toLowerCase().includes(event.toLowerCase()) }),
        ...this.spellsList[this.selectedSpell].spells.filter(x => { return x.title.toLowerCase().includes(event.toLowerCase()) })
      ];
    }
  }

  public setHability(event: SpellSelect): void {
    this.championsSelectResult.spells[this.selectedSpell] = event;
  }

  public championSelected: ChampionList = {
    description: "",
    id: 266,
    id_name: "Aatrox",
    image: "Aatrox.png",
    name: "Aatrox",
    selected: true,
    tiles: "champion0.png",
    title: "a Espada Darkin"
  };

  show() {
    const ref = this.dialogService.open(ChampionListComponent, {
      width: '80%',
    });

    ref.onClose.subscribe((champion: ChampionList) => {
      if (champion) {
        this.championSelected = champion;
      }
    })
  }
}
