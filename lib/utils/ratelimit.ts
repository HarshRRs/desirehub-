/**
 * Simple in-memory rate limiter for MVP
 * For production at scale, migrate to Redis-based solution (Upstash, Vercel KV)
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

class RateLimiter {
    private store: Map<string, RateLimitEntry> = new Map();
    private cleanupInterval: NodeJS.Timeout;

    constructor() {
        // Clean up expired entries every 5 minutes
        this.cleanupInterval = setInterval(() => {
            const now = Date.now();
            for (const [key, entry] of this.store.entries()) {
                if (now > entry.resetTime) {
                    this.store.delete(key);
                }
            }
        }, 5 * 60 * 1000);
    }

    /**
     * Check if a request should be rate limited
     * @param identifier - Unique identifier (e.g., user ID, IP address)
     * @param limit - Maximum number of requests allowed
     * @param windowMs - Time window in milliseconds
     * @returns { success: boolean, remaining: number, resetTime: number }
     */
    check(identifier: string, limit: number, windowMs: number): {
        success: boolean;
        remaining: number;
        resetTime: number;
    } {
        const now = Date.now();
        const entry = this.store.get(identifier);

        // No entry or entry expired - create new one
        if (!entry || now > entry.resetTime) {
            const resetTime = now + windowMs;
            this.store.set(identifier, { count: 1, resetTime });
            return {
                success: true,
                remaining: limit - 1,
                resetTime,
            };
        }

        // Entry exists and is valid
        if (entry.count < limit) {
            entry.count++;
            return {
                success: true,
                remaining: limit - entry.count,
                resetTime: entry.resetTime,
            };
        }

        // Rate limit exceeded
        return {
            success: false,
            remaining: 0,
            resetTime: entry.resetTime,
        };
    }

    /**
     * Reset rate limit for a specific identifier
     */
    reset(identifier: string): void {
        this.store.delete(identifier);
    }

    /**
     * Clear all rate limit data
     */
    clear(): void {
        this.store.clear();
    }

    /**
     * Clean up resources
     */
    destroy(): void {
        clearInterval(this.cleanupInterval);
        this.clear();
    }
}

// Singleton instance
const rateLimiter = new RateLimiter();

export default rateLimiter;

// Helper function for common use case
export function checkRateLimit(
    identifier: string,
    limit: number = 5,
    windowMs: number = 60 * 60 * 1000 // 1 hour default
) {
    return rateLimiter.check(identifier, limit, windowMs);
}
