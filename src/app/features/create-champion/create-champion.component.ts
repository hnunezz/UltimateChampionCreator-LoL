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
  public loading: boolean;


  public championSelected: ChampionList = new ChampionList();

  public get hasChampionSelected(): boolean {
    return this.championSelected.name !== undefined;
  }

  constructor(
    public dialogService: DialogService,
    private championService: ChampionsService
  ) {
    this.championsSelectResult = new ChampionSelect();
    this.listGeneralSpells = new SpellList()
    this.spellsList = new Array<SpellList>()

    this.selectedSpell = 0;

    this.loading = true;
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;

    const cachedChampions = localStorage.getItem('champions');
    if (!cachedChampions) {
      await this.championService.getChampions();
    } else {
      this.championService.setChampions(cachedChampions);
    }

    this.loading = false;
    this.setSpellsSelections();
  }
  private setSpellsSelections(): void {
    const spellsList = getSpellsList()
    this.spellsSelectionsItems = spellsList
      .map(element => { return { active: false, label: element[1], key: element[0] } })

      this.spellsSelectionsItems[0].active = true;
  }

  public selectSpell(spellActive: number): void {
    this.selectedSpell = spellActive;
    this.listGeneralSpells = new SpellList();

    const anotherSpells = this.spellsSelectionsItems.filter((x: any) => x.key != spellActive);
    anotherSpells.forEach((x: any) => x.active = false)
    this.spellsSelectionsItems[spellActive].active = true;

    this.listGeneralSpells = this.spellsList[spellActive];
  }

  public setHability(event: SpellSelect): void {
    this.championsSelectResult.spells[this.selectedSpell] = event;
  }

  show() {
    const ref = this.dialogService.open(ChampionListComponent, {
      width: '100%',
      height: '100%',
      styleClass: 'initial-heigh-modal'
    });

    ref.onClose.subscribe((champion: ChampionList) => {
      if (champion) {
        this.championSelected = champion;
      }
    })
  }
}
