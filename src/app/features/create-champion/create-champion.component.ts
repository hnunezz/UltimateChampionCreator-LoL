
import { Component, OnInit, inject } from '@angular/core';
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
  dialogService = inject(DialogService);
  private requestService = inject(RequestService);
  private spellListService = inject(SpellListService);

  championsSelectResult: ChampionSelect;
  listGeneralSpells: SpellList = new SpellList()
  spellsList: Array<SpellList> = new Array<SpellList>()
  championSelected: Champion;

  selectedSpell: number;
  spellsSelectionsItems: Array<any> = [];
  loading: boolean;

  get hasChampionSelected(): boolean {
    return this.championSelected?.name !== undefined;
  }

  constructor() {
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

  private setSpellsSelections() {
    const spellsList = getSpellsList()
    this.spellsSelectionsItems = spellsList
      .map(element => { return { active: false, label: element[1], key: element[0], image: '' } })

    // this.spellsSelectionsItems[0].active = true;
  }

  selectSpell(spellActive: number) {
    this.selectedSpell = spellActive;

    this.spellListService.spell = spellActive;

    this.listGeneralSpells = new SpellList();

    const anotherSpells = this.spellsSelectionsItems.filter((x: any) => x.key != spellActive);
    anotherSpells.forEach((x: any) => x.active = false)
    this.spellsSelectionsItems[spellActive].active = true;

    this.listGeneralSpells = this.spellsList[spellActive];
  }

  setHability(event: SpellSelect) {
    this.championsSelectResult.spells[this.selectedSpell] = event;
  }

  showChampionList() {
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
