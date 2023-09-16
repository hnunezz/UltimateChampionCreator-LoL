export const _urlApiVersion = `https://ddragon.leagueoflegends.com/api/versions.json`;

export const _url = (version: string, name: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion/${name}.json`;
}
