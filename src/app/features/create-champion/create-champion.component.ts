import { Champions } from 'src/app/shared/models/champions';
import { ChampionsService } from './../../shared/services/champions.service';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SpellList, SpellSelect } from 'src/app/shared/models/spell-select';
import { getSpellsList } from 'src/app/shared/enums/spells';

@Component({
  selector: 'app-create-champion',
  templateUrl: './create-champion.component.html',
  styleUrls: ['./create-champion.component.scss']
})
export class CreateChampionComponent implements OnInit {

  public champions: Champions[] = []

  public spells: Array<SpellList>;
  public listGeneralSpells: SpellList = new SpellList()

  public spellSaved: Array<SpellSelect>; //Transformar em um local storage
  public passiveSelected: string = ''; // criar enum ao inves de uma model pra cada spell

  public searchChampionInput: string = '';

  public spellsSelectionsItems: any = [];

  public get hasChampions(): boolean { return this.champions.length > 0; }
  public get hasPassives(): boolean { return this.spells.length > 0; }

  constructor(private championsService: ChampionsService) {
    this.spells = new Array<SpellList>();
  }

  async ngOnInit(): Promise<void> {
    if (!this.hasChampions) { this.champions = await this.championsService.getChampions(); }

    this.setSpellsSelections()
  }

  private setSpellsSelections() {
    const vtncJS = getSpellsList()
    this.spellsSelectionsItems = vtncJS.map(element => {
      return {
        active: false,
        label: element[1],
        key: element[0]
      }
    })
  }

  public selectSpell(spellActive: number): void {
    this.searchChampionInput = '';
    // this.listGeneralSpells = new Array<SpellList>();

    const anotherSpells = this.spellsSelectionsItems.filter((x: any) => x.key != spellActive);
    anotherSpells.forEach((x: any) => x.active = false)
    this.spellsSelectionsItems[spellActive].active = true;

    if (!this.hasPassives) {
      this.spells = this.championsService.getChampionsSpells();
    }

    this.listGeneralSpells = this.spells[spellActive];
  }


  public filterSpell(): void {
    // if (this.searchChampionInput == '') {
    //   this.listGeneralSpells = this.spells;
    // } else {
    //   this.listGeneralSpells = [
    //     ...this.spells.filter(x => x.champion.toLowerCase().includes(this.searchChampionInput.toLowerCase())),
    //     ...this.spells.filter(x => x.title.toLowerCase().includes(this.searchChampionInput.toLowerCase()))
    //   ];
    // }
  }

  public selectHability(allSpells: Array<SpellSelect>, spellSelected: SpellSelect): void {
    allSpells.forEach((element: SpellSelect) => element.selected = (element === spellSelected))
  }
}
