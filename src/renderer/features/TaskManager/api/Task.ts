import PLazy from 'p-lazy';

export type ProgressHandler = (value: number) => void;
export type OnCancelHandler = () => void;

export class CancelError extends Error {
  readonly name: 'CancelError';
  readonly isCanceled: true = true;

  constructor(reason?: string) {
    super(reason || 'Promise was canceled');
    this.name = 'CancelError';
  }
}

export class Task<ValueType> extends PLazy<ValueType> {
  private progressSubscribers: ProgressHandler[];
  private cancelHandler: OnCancelHandler | null;
  private isCancelled: boolean;
  private onReject: ((reason?: any) => void) | null;

  /**
   * Lazy cancelable promise with progress
   * @param executor
   */
  constructor(
    executor: (
      resolve: (value: ValueType | PromiseLike<ValueType>) => void,
      reject: (reason?: any) => void,
      progress: (value: number) => void,
      onCancel: (handler: OnCancelHandler) => void
    ) => void
  ) {
    const progress: ProgressHandler = (value) => {
      this.progressSubscribers.forEach((sub) => sub(value));
    };

    const onCancel = (handler: OnCancelHandler) => {
      setTimeout(() => {
        this.cancelHandler = handler;
      });
    };

    const lazyExecutor = (
      resolve: (value: ValueType | PromiseLike<ValueType>) => void,
      reject: (reason?: any) => void
    ) => {
      this.onReject = reject;

      executor(resolve, reject, progress, onCancel);
    };

    super(lazyExecutor);

    this.progressSubscribers = [];
    this.cancelHandler = null;
    this.onReject = null;
    this.isCancelled = false;
  }

  onProgress(handler: ProgressHandler) {
    this.progressSubscribers.push(handler);
  }

  cancel() {
    if (!this.cancelHandler || this.isCancelled) return;

    this.isCancelled = true;
    this.cancelHandler();
    this.onReject && this.onReject(new CancelError());
  }

  withProgress(handler: ProgressHandler): Task<ValueType> {
    this.onProgress(handler);
    return this;
  }
}
