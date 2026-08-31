import React, { useEffect, useState } from 'react';
import { checkHealth } from '../services/api';
import { ShieldCheck, ShieldAlert, RefreshCw } from 'lucide-react';

export const HealthCheck: React.FC = () => {
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [retrying, setRetrying] = useState(false);

  const verifyStatus = async () => {
    try {
      setRetrying(true);
      const res = await checkHealth();
      if (res.status === 'ok') {
        setStatus('connected');
      } else {
        setStatus('disconnected');
      }
    } catch (err) {
      setStatus('disconnected');
    } finally {
      setRetrying(false);
    }
  };

  useEffect(() => {
    verifyStatus();
    // Poll every 10 seconds to keep connection state updated
    const interval = setInterval(verifyStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-3 px-3 py-1.5 rounded-lg border border-navy-800 bg-navy-900/50 text-xs font-mono select-none">
      <span className="text-navy-400">API Status:</span>
      
      {status === 'checking' && (
        <span className="flex items-center text-navy-300">
          <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin text-navy-400" />
          Checking...
        </span>
      )}

      {status === 'connected' && (
        <span className="flex items-center text-emerald-400 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
          Backend: Connected
        </span>
      )}

      {status === 'disconnected' && (
        <span className="flex items-center text-amber-500 font-semibold">
          <ShieldAlert className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
          Backend: Disconnected
        </span>
      )}

      <button
        onClick={verifyStatus}
        disabled={retrying}
        className="text-navy-400 hover:text-navy-200 transition-colors p-0.5 rounded cursor-pointer hover:bg-navy-800 disabled:opacity-50"
        title="Recheck backend health status"
      >
        <RefreshCw className={`w-3 h-3 ${retrying ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
};
