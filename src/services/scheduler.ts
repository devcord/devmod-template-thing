import { Connection } from 'typeorm';
import { Task } from '../entities';

interface ITest {
  a: string;
}

const tasks = {
  hello: (msg: string) => console.log(msg),
  hello2: (n: ITest) => console.log(n.a),
};

type Tasks = typeof tasks;
type TaskKey = keyof Tasks;

const parseTimeoutString = (str: string): number => {
  const matches = str.match(/^(?:(\d+d))?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/g);
  console.log(matches);
  return 1000;
};

export const createScheduler = (db: Connection) => {
  const taskRepository = db.getRepository(Task);

  return <T extends TaskKey>(
    task: T,
    after: string | number,
    ...args: Parameters<Tasks[typeof task]>
  ) => {
    const executeAfter = typeof after === 'number'
      ? (new Date()).valueOf() + after
      : parseTimeoutString(after);

    return taskRepository.insert({
      task,
      executeAfter,
      args: JSON.stringify(args),
    });
  };
};
