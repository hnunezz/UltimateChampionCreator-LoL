import { Champions } from 'src/app/shared/models/champions';
import { ChampionsService } from './../../shared/services/champions.service';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { PassiveSelect } from 'src/app/shared/models/passive-select';

@Component({
  selector: 'app-create-champion',
  templateUrl: './create-champion.component.html',
  styleUrls: ['./create-champion.component.scss']
})
export class CreateChampionComponent implements OnInit {

  public champions: Champions[] = []

  public passives: Array<PassiveSelect>;
  public passivesSaved: Array<PassiveSelect>; //Transformar em um local storage
  public passiveSelected: string = '';

  public listGeneralSpells: PassiveSelect[] = []
  public searchChampionInput: string = '';

  public spellsItem = [
    { active: false, label: 'Q', image: null },
    { active: false, label: 'W', image: null },
    { active: false, label: 'E', image: null },
    { active: false, label: 'R', image: null },
  ]

  public passiveSpellsItem = { active: false, label: 'P', image: '' };

  public get hasChampions(): boolean { return this.champions.length > 0; }
  public get hasPassives(): boolean { return this.passives.length > 0; }

  constructor(private championsService: ChampionsService) {
    this.passives = new Array<PassiveSelect>();
  }

  async ngOnInit(): Promise<void> {
    if (!this.hasChampions) {
      this.champions = await this.championsService.getChampions();
    }
  }

  public selectSpell(spellActive: any): void {
    this.searchChampionInput = '';
    this.listGeneralSpells = new Array<PassiveSelect>();

    if (spellActive.label == 'P') {
      spellActive.active = !spellActive.active;
      this.spellsItem.forEach(spell => spell.active = false);
    } else {
      this.passiveSpellsItem.active = false;
      const itensNotSelected = this.spellsItem.filter(spell => spell.label != spellActive.label)
      itensNotSelected.forEach(x => x.active = false);
      spellActive.active = !spellActive.active;
    }

    this.setSpellList(spellActive);
  }

  private setSpellList(spellSelect: any): void {
    switch (spellSelect.label) {
      case 'P':
        if (!this.hasPassives) {
          this.passives = this.championsService.getChampionsPassives();
        }

        if (spellSelect.active) {
          this.listGeneralSpells = this.passives;
        }

        console.log(this.listGeneralSpells);
        break;
    }
  }

  public filterSpell(): void {
    if (this.searchChampionInput == '') {
      this.listGeneralSpells = this.passives;
    } else {
      this.listGeneralSpells = [
        ...this.passives.filter(x => x.champion.toLowerCase().includes(this.searchChampionInput.toLowerCase())),
        ...this.passives.filter(x => x.title.toLowerCase().includes(this.searchChampionInput.toLowerCase()))
      ];
    }
  }

  public selectHability(hability: PassiveSelect, index: number): void {
    this.listGeneralSpells.forEach(spell => spell.selected = false);
    this.listGeneralSpells[index].selected = !this.listGeneralSpells[index].selected;

    this.passiveSpellsItem.image = hability.image;

  }
}
