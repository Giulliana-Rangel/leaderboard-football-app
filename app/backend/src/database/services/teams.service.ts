import Teams from '../models/Teams';

export default class TeamsService {
  private teamsModel = Teams;

  getAllTeams = async () => {
    const allTeams = await this.teamsModel.findAll();
    return allTeams;
  };

  public async getById(id: number | string) {
    const byId = await this.teamsModel.findByPk(id);
    return byId;
  }
}
