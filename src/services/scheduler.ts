import { Connection, LessThan, Repository } from 'typeorm';
import { Task } from '../entities';
import * as tasks from './tasks';

type Tasks = typeof tasks;
type TaskKey = keyof Tasks;

const parseTimeoutString = (str: string) => {
  const matches = /^(?:(\d)+d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/g.exec(str);
  if (matches === null) {
    return undefined;
  }

  const [, days, hours, minutes, seconds] = matches.map((n) => parseInt(n, 10));
  return (days || 0) * 24 * 60 * 60 * 1000
    + (hours || 0) * 60 * 60 * 1000
    + (minutes || 0) * 60 * 1000
    + (seconds || 0) * 1000;
};

const taskExists = (taskKey: string): taskKey is keyof Tasks => tasks.hasOwnProperty(taskKey);

const runWorker = async (taskRepo: Repository<Task>) => {
  const now = new Date();
  const finishedTaskIds = await taskRepo.find({
    where: {
      executeAfter: LessThan(now),
    },
  }).then((tasksToRun) => tasksToRun.map(({ id, task, args }) => {
    const argArr = JSON.parse(args);
    if (taskExists(task) && Array.isArray(argArr)) {
      console.log('Running task: ', id, task);
      // @ts-ignore idk what the fuck it wants
      tasks[task](...argArr);
    }
    return id;
  }));

  if (finishedTaskIds.length > 0) {
    try {
      await taskRepo.delete(finishedTaskIds);
    } catch (e) {
      console.error(e);
    }
  }

  setTimeout(() => runWorker(taskRepo), 1000);
};

export const createScheduler = (db: Connection) => {
  const taskRepo = db.getRepository(Task);
  runWorker(taskRepo).catch(console.error);

  return <T extends TaskKey>(
    task: T,
    after: string | number,
    ...args: Parameters<Tasks[typeof task]>
  ) => {
    const msAfter = typeof after === 'string' ? parseTimeoutString(after) : after;
    if (msAfter === undefined) {
      throw Error(`Unable to parse timeout string: ${after}`);
    }

    const executeAfter = new Date();
    executeAfter.setMilliseconds(executeAfter.getMilliseconds() + msAfter);

    return taskRepo.insert({
      task,
      executeAfter,
      args: JSON.stringify(args),
    });
  };
};
