
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ChampionListService } from 'src/app/features/create-champion/champion-list/services/champion-list.service';
import { _url, _urlApiVersion } from 'src/assets/enviroment';
import { Champion } from '../models/champion.model';
import { ResponseModel } from '../models/response-model.models';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public names = [
    "Aatrox",
    "Ahri",
    "Akali",
    "Akshan",
    "Alistar",
    "Amumu",
    "Anivia",
    "Annie",
    "Aphelios",
    "Ashe",
    "AurelionSol",
    "Azir",
    "Bard",
    "Belveth",
    "Blitzcrank",
    "Brand",
    "Braum",
    "Caitlyn",
    "Camille",
    "Cassiopeia",
    "Chogath",
    "Corki",
    "Darius",
    "Diana",
    "Draven",
    "DrMundo",
    "Ekko",
    "Elise",
    "Evelynn",
    "Ezreal",
    "Fiddlesticks",
    "Fiora",
    "Fizz",
    "Galio",
    "Gangplank",
    "Garen",
    "Gnar",
    "Gragas",
    "Graves",
    "Gwen",
    "Hecarim",
    "Heimerdinger",
    "Illaoi",
    "Irelia",
    "Ivern",
    "Janna",
    "JarvanIV",
    "Jax",
    "Jayce",
    "Jhin",
    "Jinx",
    "Kaisa",
    "Kalista",
    "Karma",
    "Karthus",
    "Kassadin",
    "Katarina",
    "Kayle",
    "Kayn",
    "Kennen",
    "Khazix",
    "Kindred",
    "Kled",
    "KogMaw",
    "KSante",
    "Leblanc",
    "LeeSin",
    "Leona",
    "Lillia",
    "Lissandra",
    "Lucian",
    "Lulu",
    "Lux",
    "Malphite",
    "Malzahar",
    "Maokai",
    "MasterYi",
    "Milio",
    "MissFortune",
    "MonkeyKing",
    "Mordekaiser",
    "Morgana",
    "Nami",
    "Nasus",
    "Nautilus",
    "Neeko",
    "Nidalee",
    "Nilah",
    "Nocturne",
    "Nunu",
    "Olaf",
    "Orianna",
    "Ornn",
    "Pantheon",
    "Poppy",
    "Pyke",
    "Qiyana",
    "Quinn",
    "Rakan",
    "Rammus",
    "RekSai",
    "Rell",
    "Renata",
    "Renekton",
    "Rengar",
    "Riven",
    "Rumble",
    "Ryze",
    "Samira",
    "Sejuani",
    "Senna",
    "Seraphine",
    "Sett",
    "Shaco",
    "Shen",
    "Shyvana",
    "Singed",
    "Sion",
    "Sivir",
    "Skarner",
    "Sona",
    "Soraka",
    "Swain",
    "Sylas",
    "Syndra",
    "TahmKench",
    "Taliyah",
    "Talon",
    "Taric",
    "Teemo",
    "Thresh",
    "Tristana",
    "Trundle",
    "Tryndamere",
    "TwistedFate",
    "Twitch",
    "Udyr",
    "Urgot",
    "Varus",
    "Vayne",
    "Veigar",
    "Velkoz",
    "Vex",
    "Vi",
    "Viego",
    "Viktor",
    "Vladimir",
    "Volibear",
    "Warwick",
    "Xayah",
    "Xerath",
    "XinZhao",
    "Yasuo",
    "Yone",
    "Yorick",
    "Yuumi",
    "Zac",
    "Zed",
    "Zeri",
    "Ziggs",
    "Zilean",
    "Zoe",
    "Zyra",
    "Briar"
  ]

  private version = '';

  constructor(private http: HttpClient,
    private championList: ChampionListService) { }

  getChampions() {
    let result: Champion[] = [];

    this.names
      .sort()
      .forEach(name => {
        this.http.get<ResponseModel<Champion[]>>(_url(this.version, name))
          .subscribe(champ => {
            result.push(
              {
                id: Object.values(champ.data)[0].key,
                id_name: Object.values(champ.data)[0].id,
                key: Object.values(champ.data)[0].key,
                name: Object.values(champ.data)[0].name,
                title: Object.values(champ.data)[0].title,
                tiles: `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${Object.values(champ.data)[0].id}_0.jpg`,
                image: `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${Object.values(champ.data)[0].id}_0.jpg`,
                skins: Object.values(champ.data)[0].skins,
                lore: Object.values(champ.data)[0].lore,
                tags: Object.values(champ.data)[0].tags,
                description: Object.values(champ.data)[0].description,
                partype: Object.values(champ.data)[0].partype,
                spells: Object.values(champ.data)[0].spells,
                passive: Object.values(champ.data)[0].passive,
                // passive: `https://ddragon.leagueoflegends.com/cdn/13.18.1/img/passive/${Object.values(champ.data)[0].id}_P.png`,
                selected: false,
              });
          });
      })

    this.championList.champions = result;
  }

  getVersion() {
    this.http.get<string[]>(_urlApiVersion)
      .subscribe(arr => this.version = arr[0])
  }
}
