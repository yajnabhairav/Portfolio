import React, { useState, useEffect } from 'react';
import { Database, Activity, CheckCircle, RefreshCw } from 'lucide-react';
import { api } from '../services/api.ts';
import { SystemHealth } from '../types.ts';

export const SystemHealthBadge: React.FC = () => {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastPing, setLastPing] = useState<number | null>(null);

  const checkHealth = async () => {
    try {
      setLoading(true);
      const t0 = performance.now();
      const data = await api.getHealth();
      const roundTrip = Math.round(performance.now() - t0);
      setHealth(data);
      setLastPing(roundTrip);
    } catch (err) {
      console.error('System health check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-950/50 text-blue-400 border border-blue-900/40">
          <Database className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
            <span>Database & API Engine</span>
            {health && (
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                {health.status}
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            {health ? (
              <>
                Engine: {health.system.diagnostics.engine} · Uptime: {health.system.diagnostics.uptimeSeconds}s · Active Store: {health.system.diagnostics.database}
              </>
            ) : (
              'Testing server & database connectivity...'
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {lastPing !== null && (
          <div className="text-[11px] font-mono text-slate-400">
            Ping: <span className="text-emerald-400 font-semibold tabular-nums">{lastPing}ms</span>
          </div>
        )}
        <button
          onClick={checkHealth}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors disabled:opacity-60"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin text-blue-400' : ''}`} />
          <span>{loading ? 'Pinging...' : 'Test Connection'}</span>
        </button>
      </div>
    </div>
  );
};
