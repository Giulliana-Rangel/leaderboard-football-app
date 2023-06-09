import * as express from 'express';
import matchesRoute from './routes/Matches.route';
import teamsRoute from './routes/teams.route';
import loginRoute from './routes/User.route';
import leaderBoardRoute from './routes/LeaderBoard.route';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(express.json());
    this.app.use(accessControl);

    // rotas ftc:
    this.app.use('/teams', teamsRoute.route);

    this.app.use('/login', loginRoute.router);

    this.app.use('/matches', matchesRoute.route);

    this.app.use('/leaderboard', leaderBoardRoute.route);

    // this.app.get('/teams', (req, res) => (res.send(200)));
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
