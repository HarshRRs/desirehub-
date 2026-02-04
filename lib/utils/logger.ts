/**
 * Structured logging utility
 * Prepared for external monitoring service integration (Sentry, LogRocket, etc.)
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
    userId?: string;
    endpoint?: string;
    method?: string;
    statusCode?: number;
    duration?: number;
    [key: string]: any;
}

class Logger {
    private isDevelopment = process.env.NODE_ENV === 'development';

    private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
        const timestamp = new Date().toISOString();
        const contextStr = context ? JSON.stringify(context) : '';
        return `[${timestamp}] [${level.toUpperCase()}] ${message} ${contextStr}`;
    }

    info(message: string, context?: LogContext): void {
        const formatted = this.formatMessage('info', message, context);
        console.log(formatted);

        // TODO: Send to external monitoring service in production
        // if (!this.isDevelopment) {
        //   // Send to Sentry, LogRocket, etc.
        // }
    }

    warn(message: string, context?: LogContext): void {
        const formatted = this.formatMessage('warn', message, context);
        console.warn(formatted);

        // TODO: Send to external monitoring service
    }

    error(message: string, error?: Error, context?: LogContext): void {
        const errorContext = {
            ...context,
            error: error?.message,
            stack: error?.stack,
        };
        const formatted = this.formatMessage('error', message, errorContext);
        console.error(formatted);

        // TODO: Send to Sentry or similar
        // if (!this.isDevelopment) {
        //   Sentry.captureException(error, { contexts: { custom: context } });
        // }
    }

    debug(message: string, context?: LogContext): void {
        if (this.isDevelopment) {
            const formatted = this.formatMessage('debug', message, context);
            console.debug(formatted);
        }
    }

    /**
     * Log API request/response
     */
    apiLog(
        method: string,
        endpoint: string,
        statusCode: number,
        duration?: number,
        userId?: string
    ): void {
        this.info('API Request', {
            method,
            endpoint,
            statusCode,
            duration,
            userId,
        });
    }

    /**
     * Log authentication events
     */
    authLog(event: string, userId?: string, success: boolean = true): void {
        const level = success ? 'info' : 'warn';
        this[level](`Auth Event: ${event}`, { userId, success });
    }

    /**
     * Log upload events
     */
    uploadLog(
        userId: string,
        fileName: string,
        fileSize: number,
        success: boolean,
        errorMsg?: string
    ): void {
        if (success) {
            this.info('File Upload Success', {
                userId,
                fileName,
                fileSize,
            });
        } else {
            this.error('File Upload Failed', new Error(errorMsg || 'Upload failed'), {
                userId,
                fileName,
                fileSize,
            });
        }
    }
}

// Singleton instance
const logger = new Logger();

export default logger;
