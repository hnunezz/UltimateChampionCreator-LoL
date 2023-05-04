import { Champions } from 'src/app/shared/models/champions';
import { ChampionsService } from './../../shared/services/champions.service';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SpellList, SpellSelect } from 'src/app/shared/models/spell-select';
import { getSpellsList } from 'src/app/shared/enums/spells';
import { ChampionSelect } from 'src/app/shared/models/champion-select';

@Component({
  selector: 'app-create-champion',
  templateUrl: './create-champion.component.html',
  styleUrls: ['./create-champion.component.scss']
})
export class CreateChampionComponent implements OnInit {

  public championsSelectResult: ChampionSelect //*SELECTED ITEMS
  public searchChampionInput: string = ''; //*Input

  public spells: Array<SpellList>;

  public listGeneralSpells: SpellList = new SpellList()
  public TESTE: SpellList = new SpellList()

  public spellsSelectionsItems: any = [];
  private selectedSpell: number = 0;

  public get hasPassives(): boolean { return this.spells.length > 0; }

  constructor(private championsService: ChampionsService) {
    this.championsSelectResult = new ChampionSelect();
    this.spells = new Array<SpellList>();
  }

  async ngOnInit(): Promise<void> {
    this.setSpellsSelections()
  }

  private setSpellsSelections() {
    const spellsList = getSpellsList()
    this.spellsSelectionsItems = spellsList.map(element => {
      return {
        active: false,
        label: element[1],
        key: element[0]
      }
    })
  }

  public selectSpell(spellActive: number): void {
    this.searchChampionInput = '';
    this.listGeneralSpells = new SpellList();

    const anotherSpells = this.spellsSelectionsItems.filter((x: any) => x.key != spellActive);
    anotherSpells.forEach((x: any) => x.active = false)
    this.spellsSelectionsItems[spellActive].active = true;

    //*Define spell active to global use.
    this.selectedSpell = spellActive;

    if (!this.hasPassives) {
      this.spells = this.championsService.getChampionsSpells();
    }

    this.TESTE = this.spells[spellActive];
    this.listGeneralSpells = this.spells[spellActive];
  }


  public filterSpell(): void {
    this.listGeneralSpells = new SpellList();

    if (this.searchChampionInput == '') {
      this.listGeneralSpells.spells = this.TESTE.spells;
    } else {
      this.listGeneralSpells.spells = [
        ...this.TESTE.spells.filter(x => { return x.champion.toLowerCase().includes(this.searchChampionInput.toLowerCase()) }),
        ...this.TESTE.spells.filter(x => { return x.title.toLowerCase().includes(this.searchChampionInput.toLowerCase()) })
      ];
    }
  }

  public selectHability(allSpells: Array<SpellSelect>, spellSelected: SpellSelect): void {
    allSpells.forEach((element: SpellSelect) => element.selected = (element === spellSelected))
    this.championsSelectResult.spells[this.selectedSpell] = spellSelected;
  }
}
