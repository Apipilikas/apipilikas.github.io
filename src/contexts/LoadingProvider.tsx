import { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';

interface LoadingProps {
  isReady: boolean;
  setPageReady: () => void;
  setPageLoading: () => void;
  registerTask: (id: string) => void;
  deregisterTask: (id: string) => void;
  resolveTask: (id: string) => void;
  failTask: (id: string, error: string) => void;
  observeTask: (id: string) => Task;
  clearTasks: () => void;
}

export enum TaskStatus {
  Pending,
  Resolved,
  Failed
}

interface Task {
  status: TaskStatus;
  error?: string;
}

const LoadingContext = createContext<LoadingProps | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider!");
  }
  return context;
};

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);

  const [tasks, setTasks] = useState<Record<string, Task>>({});

  useEffect(() => {
    const tasksList = Object.values(tasks);

    if (tasksList.length > 0 && tasksList.every(task => task.status !== TaskStatus.Pending)) {
        setPageReady();
      }
  }, [tasks]);

  const setPageReady = () => setIsReady(true);
  const setPageLoading = () => setIsReady(false);

  const registerTask = (id : string) => {
    setTasks(value => ({ ...value, [id]: {"status": TaskStatus.Pending}}));
  }

  const deregisterTask = (id : string) => {
    setTasks(value => {
      const next = { ...value };
      delete next[id];
      return next;
    });
  }
  
  const resolveTask = (id : string) => {
    setTasks(value => ({ ...value, [id]: {"status": TaskStatus.Resolved}}));
  }

  const failTask = (id: string, error: string) => {
        setTasks(value => ({ ...value, [id]: {"status": TaskStatus.Failed, "error": error}}));

  }

  const observeTask = (id: string) => {
    return tasks[id] ?? {"status": TaskStatus.Pending};
  };

  const clearTasks = () => setTasks({});

  return (
    <LoadingContext.Provider value={{ isReady, setPageReady, setPageLoading, registerTask, deregisterTask, resolveTask, failTask, observeTask, clearTasks }}>
      {children}
    </LoadingContext.Provider>
  );
};