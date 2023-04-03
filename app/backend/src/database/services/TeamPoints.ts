import { IMatches } from '../../interfaces/index.interface';

export default class TeamPoints {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency?: number;

  constructor(teamName: string) {
    this.name = teamName;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  totalPointsTeam(goalsFavor: number, goalsOwn: number) {
    if (goalsFavor > goalsOwn) {
      this.totalPoints += 3;
      this.totalVictories += 1;
    }

    if (goalsFavor < goalsOwn) {
      this.totalLosses += 1;
    }
    if (goalsFavor === goalsOwn) {
      this.totalDraws += 1;
      this.totalPoints += 1;
    }
  }

  matchInfo(match: IMatches, path: string) {
    const goalsFavor = path === 'home' ? match.homeTeamGoals : match.awayTeamGoals;
    const goalsOwn = path === 'home' ? match.awayTeamGoals : match.homeTeamGoals;

    this.goalsFavor += goalsFavor;
    this.goalsOwn += goalsOwn;
    this.totalGames += 1;
    this.totalPointsTeam(goalsFavor, goalsOwn);
    this.efficiency = +((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }
}
