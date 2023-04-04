export interface ITeams {
  id: number;
  teamName: string;
}

export interface Ilogin {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  role?: string;
  email: string;
  password: string;
}

export interface IPayloadUser {
  payload : {
    id: number;
    username: string;
    role?: string;
    email: string;
    password: string;
  }
}

export interface IMatches {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IUpdateMatches {
  id: number,
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface INewMatch {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface ITeamPoints {
  matchData: (match: IMatches, path:string) => void;
  name: string;
  id: number;
  totalGames: number;
  totalPoints: number;
  totalVictories: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  totalDraws: number;
  goalsBalance: number;
  efficiency: number;
}

export interface ILeaderboardHome {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency?: number

}
