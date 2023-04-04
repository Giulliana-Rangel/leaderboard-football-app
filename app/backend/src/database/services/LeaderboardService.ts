import { ITeamPoints } from '../../interfaces/index.interface';
import Teams from '../models/Teams';
import MatchesService from './MatchesService';
import TeamPoints from './TeamPoints';

export default class LeaderBoardService {
  constructor(
    private _teamsModel = Teams,
    // private _matchesService = MatchesService,
  ) {}

  getAllTeams = async () => {
    const allTeams = await this._teamsModel.findAll();
    return allTeams;
  };

  getAllFinishedMatches = async () => {
    const matchesService = new MatchesService();
    const allFinished = await matchesService.getAllMtachesProgress(false);
    if (allFinished) {
      return allFinished;
    }
  };

  homeOrAwayLeaderBoard = async (teamPoints: ITeamPoints[], path: string) => {
    const matches = await this.getAllFinishedMatches();

    matches?.forEach((match) => {
      const homeOrAwayTeam = teamPoints
        .find((team) => team.id === (path === 'home' ? match.homeTeamId : match.awayTeamId));
      if (homeOrAwayTeam) {
        homeOrAwayTeam.matchData(match, path);
      }
    });
  };

  getGeneralBoard = async (teamPoints: ITeamPoints[]) => {
    const teams = await this.getAllFinishedMatches();
    teams?.forEach((match) => {
      const homeTeam = teamPoints.find((team) => team.id === match.homeTeamId);
      const awayTeam = teamPoints.find((team) => team.id === match.awayTeamId);
      if (homeTeam) homeTeam.matchData(match, 'home');
      if (awayTeam) awayTeam.matchData(match, 'away');
    });
  };

  getLeaderboard = async (path = '/') => {
    const teams = await this.getAllTeams();
    const teamPoints = teams.map((team) => new TeamPoints(team.teamName));

    if (path === 'home' || path === 'away') {
      await this.homeOrAwayLeaderBoard(teamPoints, path);
    } else {
      await this.getGeneralBoard(teamPoints);
    }
    return LeaderBoardService.getSort(teamPoints);
  };

  static getSort = async (array:ITeamPoints[]) => array.sort((a: ITeamPoints, b: ITeamPoints) => {
    if (a.totalPoints === b.totalPoints) {
      if (a.goalsBalance === b.goalsBalance) {
        return a.goalsFavor - b.goalsFavor;
      }
      return a.goalsBalance - b.goalsBalance;
    }
    return a.totalPoints - b.totalPoints;
  });
} // fecha a class
