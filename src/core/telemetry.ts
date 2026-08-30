// Client-side Telemetry & Error Diagnostic Logger
import { supabaseService } from './supabaseClient';

export interface ClientErrorLog {
  id: string;
  timestamp: number;
  message: string;
  stack?: string;
  source: 'canvas' | 'image_loader' | 'ui' | 'unhandled' | 'export';
  url: string;
  userAgent: string;
  screenResolution: string;
  deviceMemory?: string;
  stateSnapshot?: string;
}

export interface ClientPerformanceMetric {
  id: string;
  timestamp: number;
  metric: 'LCP' | 'CLS' | 'FID' | 'TTFB' | 'renderTime' | 'exportTime';
  value: number;
  unit: string;
}

const ERROR_STORAGE_KEY = 'collagenie_telemetry_errors_v1';
const PERF_STORAGE_KEY = 'collagenie_telemetry_perf_v1';
const MAX_STORED_LOGS = 100;

export class TelemetryService {
  private static instance: TelemetryService;
  private errors: ClientErrorLog[] = [];
  private metrics: ClientPerformanceMetric[] = [];

  private constructor() {
    this.loadFromStorage();
    this.initGlobalListeners();
  }

  public static getInstance(): TelemetryService {
    if (!TelemetryService.instance) {
      TelemetryService.instance = new TelemetryService();
    }
    return TelemetryService.instance;
  }

  private loadFromStorage() {
    try {
      const storedErrors = localStorage.getItem(ERROR_STORAGE_KEY);
      if (storedErrors) this.errors = JSON.parse(storedErrors);

      const storedPerf = localStorage.getItem(PERF_STORAGE_KEY);
      if (storedPerf) this.metrics = JSON.parse(storedPerf);
    } catch {
      this.errors = [];
      this.metrics = [];
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(ERROR_STORAGE_KEY, JSON.stringify(this.errors.slice(-MAX_STORED_LOGS)));
      localStorage.setItem(PERF_STORAGE_KEY, JSON.stringify(this.metrics.slice(-MAX_STORED_LOGS)));
    } catch {
      // ignore storage quota errors
    }
  }

  private initGlobalListeners() {
    if (typeof window === 'undefined') return;

    window.addEventListener('error', event => {
      this.logError({
        message: event.message || 'Unknown Window Error',
        stack: event.error?.stack,
        source: 'unhandled',
        url: event.filename || window.location.href,
      });
    });

    window.addEventListener('unhandledrejection', event => {
      this.logError({
        message: event.reason?.message || String(event.reason) || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        source: 'unhandled',
        url: window.location.href,
      });
    });
  }

  public logError(params: {
    message: string;
    stack?: string;
    source?: ClientErrorLog['source'];
    url?: string;
    stateSnapshot?: any;
  }) {
    const errorEntry: ClientErrorLog = {
      id: `err_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      message: params.message,
      stack: params.stack,
      source: params.source || 'ui',
      url: params.url || window.location.href,
      userAgent: navigator.userAgent,
      screenResolution: `${window.innerWidth}x${window.innerHeight} (DPR: ${window.devicePixelRatio || 1})`,
      deviceMemory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : undefined,
      stateSnapshot: params.stateSnapshot ? JSON.stringify(params.stateSnapshot).slice(0, 500) : undefined,
    };

    this.errors.unshift(errorEntry);
    if (this.errors.length > MAX_STORED_LOGS) {
      this.errors.pop();
    }
    this.saveToStorage();

    // Broadcast to centralized Supabase database
    supabaseService.logError({
      message: errorEntry.message,
      stack: errorEntry.stack,
      source: errorEntry.source,
      url: errorEntry.url,
      user_agent: errorEntry.userAgent,
      screen_resolution: errorEntry.screenResolution,
      state_snapshot: errorEntry.stateSnapshot,
    }).catch(() => {});
  }

  public logMetric(metric: ClientPerformanceMetric['metric'], value: number, unit = 'ms') {
    const entry: ClientPerformanceMetric = {
      id: `m_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: Date.now(),
      metric,
      value: Math.round(value * 100) / 100,
      unit,
    };

    this.metrics.unshift(entry);
    if (this.metrics.length > MAX_STORED_LOGS) {
      this.metrics.pop();
    }
    this.saveToStorage();
  }

  public getErrors(): ClientErrorLog[] {
    return this.errors;
  }

  public getMetrics(): ClientPerformanceMetric[] {
    return this.metrics;
  }

  public clearLogs() {
    this.errors = [];
    this.metrics = [];
    this.saveToStorage();
  }

  public getDiagnosticSummary() {
    const now = Date.now();
    const last24h = now - 24 * 60 * 60 * 1000;
    const errors24h = this.errors.filter(e => e.timestamp > last24h);

    const sourcesCount: Record<string, number> = {};
    this.errors.forEach(e => {
      sourcesCount[e.source] = (sourcesCount[e.source] || 0) + 1;
    });

    return {
      totalErrors: this.errors.length,
      errorsLast24h: errors24h.length,
      errorsBySource: sourcesCount,
      lastError: this.errors[0] || null,
      healthScore: Math.max(0, 100 - errors24h.length * 5),
    };
  }
}

export const telemetry = TelemetryService.getInstance();
