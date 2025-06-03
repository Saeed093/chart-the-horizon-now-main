import Dexie, { Table } from 'dexie';

export interface ProjectPlan {
  id: number;
  data: any;
}

export interface Progress {
  id: number;
  data: any;
}

class AppDB extends Dexie {
  projectPlan!: Table<ProjectPlan, number>;
  progress!: Table<Progress, number>;

  constructor() {
    super('AppDB');
    this.version(1).stores({
      projectPlan: 'id',
      progress: 'id',
    });
  }
}

export const db = new AppDB(); 