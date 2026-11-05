import { createContext, useContext, useState, ReactNode, useRef } from 'react';

interface LoadingProps {
  isReady: boolean;
  setPageReady: () => void;
  setPageLoading: () => void;
  registerTask: (id: string) => void;
  deregisterTask: (id: string) => void;
  resolveTask: (id: string) => void;
  clearTasks: () => void;
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

  const tasks = useRef<Set<string>>(new Set());

  const setPageReady = () => setIsReady(true);
  const setPageLoading = () => setIsReady(false);

  const registerTask = (id : string) => {
    tasks.current.add(id);
  }

  const deregisterTask = (id : string) => {
    tasks.current.delete(id);
  }

  const resolveTask = (id : string) => {
    deregisterTask(id);

    if (tasks.current.size == 0) {
      setPageReady();
    }
  }

  const clearTasks = () => tasks.current.clear();

  return (
    <LoadingContext.Provider value={{ isReady, setPageReady, setPageLoading, registerTask, deregisterTask, resolveTask, clearTasks }}>
      {children}
    </LoadingContext.Provider>
  );
};