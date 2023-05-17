import { Champions } from 'src/app/shared/models/champions';
import { ChampionsService } from './../../shared/services/champions.service';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SpellList, SpellSelect } from 'src/app/shared/models/spell-select';
import { getSpellsList } from 'src/app/shared/enums/spells';
import { ChampionSelect } from 'src/app/shared/models/champion-select';
import { CacheService } from 'src/app/shared/services/cache-service.service';
import { ResponseModel } from 'src/app/shared/models/response-model.models';

@Component({
  selector: 'app-create-champion',
  templateUrl: './create-champion.component.html',
  styleUrls: ['./create-champion.component.scss']
})
export class CreateChampionComponent implements OnInit {

  public championsSelectResult: ChampionSelect;
  public listGeneralSpells: SpellList = new SpellList()
  public spellsList: Array<SpellList> = new Array<SpellList>()

  public searchChampionInput: string; //*Input
  private selectedSpell: number;

  public spellsSelectionsItems: any = [];

  constructor(
    private championsService: ChampionsService,
    private cacheService: CacheService
  ) {
    this.championsSelectResult = new ChampionSelect();
    this.listGeneralSpells = new SpellList()
    this.spellsList = new Array<SpellList>()

    this.searchChampionInput = "";
    this.selectedSpell = 0;
  }

  async ngOnInit(): Promise<void> {
    this.setSpellsSelections();

    if (this.cacheService.get('champions') == null) {
      await this.getChampions();
    }

    this.getSpells();
  }

  private async getChampions(): Promise<void> {
    const result = await this.championsService.getChampions() as ResponseModel<Champions>;
    this.cacheService.set('champions', JSON.stringify(result.data));
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
    this.searchChampionInput = '';
    this.listGeneralSpells = new SpellList();

    const anotherSpells = this.spellsSelectionsItems.filter((x: any) => x.key != spellActive);
    anotherSpells.forEach((x: any) => x.active = false)
    this.spellsSelectionsItems[spellActive].active = true;

    this.listGeneralSpells = this.spellsList[spellActive];
  }

  public filterSpell(): void {
    this.listGeneralSpells = new SpellList();

    if (this.searchChampionInput == '') {
      this.listGeneralSpells.spells = this.spellsList[this.selectedSpell].spells;
    } else {
      this.listGeneralSpells.spells = [
        ...this.spellsList[this.selectedSpell].spells.filter(x => { return x.champion.toLowerCase().includes(this.searchChampionInput.toLowerCase()) }),
        ...this.spellsList[this.selectedSpell].spells.filter(x => { return x.title.toLowerCase().includes(this.searchChampionInput.toLowerCase()) })
      ];
    }
  }

  public selectHability(allSpells: Array<SpellSelect>, spellSelected: SpellSelect): void {
    allSpells.forEach((element: SpellSelect) => element.selected = (element === spellSelected))
    this.championsSelectResult.spells[this.selectedSpell] = spellSelected;
  }
}


//REVER LOAD DEMORADO DAS IMAGENS
