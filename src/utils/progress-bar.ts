/**
 * @file
 * 
 * A simple progress bar implementation for displaying status
 * of long-running operations in the terminal.
 */

/** */

/**
 * A utility class for displaying a progress bar in the terminal
 */
export class ProgressBar {
  private bar: string = '';
  private timer: NodeJS.Timeout | null = null;
  private startTime: number = Date.now();
  private lastRenderTime: number = 0;
  private renderThrottleMs: number = 50; // Throttle updates to prevent flickering
  private spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  private spinnerIdx = 0;

  /**
   * Creates a new progress bar
   * 
   * @param {number} total - Total number of items to process
   * @param {object} options - Options for the progress bar
   * @param {boolean} options.showPercent - Whether to show percentage
   * @param {boolean} options.showCount - Whether to show count of processed items
   * @param {boolean} options.showElapsed - Whether to show elapsed time
   * @param {boolean} options.showSpinner - Whether to show spinner animation
   * @param {number} options.width - Width of the progress bar in characters
   * @param {string} options.barChar - Character used for the progress bar
   * @param {string} options.emptyChar - Character used for the empty part of the bar
   */
  constructor(
    private total: number,
    private options: {
      showPercent?: boolean;
      showCount?: boolean;
      showElapsed?: boolean;
      showSpinner?: boolean;
      width?: number;
      barChar?: string;
      emptyChar?: string;
    } = {}
  ) {
    this.options = {
      showPercent: true,
      showCount: true,
      showElapsed: true,
      showSpinner: true,
      width: 25,
      barChar: '█',
      emptyChar: '░',
      ...options
    };
  }

  /**
   * Starts the progress bar
   */
  start(): void {
    process.stdout.write('\n'); // Start on a new line
    this.update(0);
    if (this.options.showSpinner) {
      this.timer = setInterval(() => {
        this.spinnerIdx = (this.spinnerIdx + 1) % this.spinner.length;
        this.render();
      }, 100);
    }
  }

  /**
   * Updates the progress bar with a new value
   * 
   * @param {number} current - Current progress value
   */
  update(current: number): void {
    const now = Date.now();
    if (now - this.lastRenderTime < this.renderThrottleMs && current < this.total) {
      return; // Throttle updates
    }
    
    this.lastRenderTime = now;
    const percent = Math.min(Math.floor((current / this.total) * 100), 100);
    const width = this.options.width;
    const completeLen = Math.round((percent / 100) * width);
    const emptyLen = width - completeLen;

    let output = '';
    
    // Add spinner if enabled
    if (this.options.showSpinner) {
      output += `${this.spinner[this.spinnerIdx]} `;
    }
    
    // Create the progress bar
    output += '[' + 
      this.options.barChar.repeat(completeLen) +
      this.options.emptyChar.repeat(emptyLen) +
      '] ';
    
    // Add percentage if enabled
    if (this.options.showPercent) {
      output += `${percent.toString().padStart(3)}% `;
    }
    
    // Add count if enabled
    if (this.options.showCount) {
      output += `(${current}/${this.total}) `;
    }
    
    // Add elapsed time if enabled
    if (this.options.showElapsed) {
      const elapsedSecs = Math.round((now - this.startTime) / 1000);
      output += `${formatTime(elapsedSecs)}`;
    }

    this.bar = output;
    this.render();
  }

  /**
   * Renders the current progress bar state to the terminal
   */
  private render(): void {
    process.stdout.write(`\r${this.bar}`);
  }

  /**
   * Completes the progress bar
   */
  complete(message: string = 'Completed'): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    
    this.update(this.total);
    const elapsedSecs = Math.round((Date.now() - this.startTime) / 1000);
    process.stdout.write(`\r${message} in ${formatTime(elapsedSecs)}\n\n`);
  }
}

/**
 * Formats seconds into a human-readable time string
 * 
 * @param {number} seconds - Seconds to format
 * @returns {string} Formatted time string
 */
function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  if (mins < 60) {
    return `${mins}m ${secs}s`;
  }
  
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  
  return `${hours}h ${remainingMins}m ${secs}s`;
}